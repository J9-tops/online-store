import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

type ModelName =
  | "user"
  | "session"
  | "account"
  | "verification"
  | "product"
  | "category"
  | "sale";

interface DbData {
  user: any[];
  session: any[];
  account: any[];
  verification: any[];
  product: any[];
  category: any[];
  sale: any[];
}

class JsonModel {
  private modelName: ModelName;
  private client: JsonClient;

  constructor(modelName: ModelName, client: JsonClient) {
    this.modelName = modelName;
    this.client = client;
  }

  private getData(): any[] {
    return this.client.data[this.modelName];
  }

  private save() {
    this.client.save();
  }

  async findMany(args?: any) {
    let items = this.getData();

    if (args?.where) {
      items = items.filter((item) => this.matchWhere(item, args.where));
    }

    if (args?.orderBy) {
      // Basic support for single orderBy
      const orderBy = args.orderBy;
      const key = Object.keys(orderBy)[0];
      const direction = orderBy[key];
      items = [...items].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (args?.skip) {
      items = items.slice(args.skip);
    }

    if (args?.take) {
      items = items.slice(0, args.take);
    }

    if (args?.include) {
      items = items.map((item) => this.resolveRelations(item, args.include));
    }

    return items;
  }

  async findFirst(args?: any) {
    const items = await this.findMany({ ...args, take: 1 });
    return items[0] || null;
  }

  async findUnique(args: any) {
    return this.findFirst(args);
  }

  async create(args: any) {
    const data = { ...args.data };

    // Handle connect
    for (const key in data) {
      if (data[key]?.connect) {
        // Just store the relationship IDs for now, or fetch the related objects?
        // Prisma stores basic scalars.
        // If it's a many-to-many (like categories on products), we might need a join table concept
        // or just store array of IDs if mimicking document store.
        // For simplicity in this "JSON DB", let's behave like a document store for arrays.
        // But we need to be careful with existing schema expectations.
        // Product -> Categories is Many-to-Many.
        // User -> Session is One-to-Many.
        
        // Simulating connect for mimicry:
        const connect = data[key].connect;
        if (Array.isArray(connect)) {
           // Many-to-many or One-to-many input
           // We probably want to look them up to ensure they exist, but for now just mock.
        }
      }
    }

    // Auto-generate ID if missing like cuid
    if (!data.id) {
      data.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    // Handle 'default' fields roughly (createdAt, etc)
    if (!data.createdAt) data.createdAt = new Date();
    if (!data.updatedAt) data.updatedAt = new Date();

    // Process nested writes (very basic)
    const processedData = await this.processNestedWrites(data);

    this.getData().push(processedData);
    this.save();
    return processedData;
  }

  async update(args: any) {
    const items = this.getData();
    const index = items.findIndex((item) => this.matchWhere(item, args.where));
    
    if (index === -1) {
        // Prisma throws, but we can return null or throw.
        throw new Error(`Record to update not found in ${this.modelName}`);
    }

    const current = items[index];
    const updates = { ...args.data };
    
    // Handle set/connect/disconnect for relations
     for (const key in updates) {
       if (updates[key]?.set !== undefined) {
         // Replace relation
         // For a simplified JSON approach, if we store relation data on the object, we update it.
         // If it's Many-to-Many (categories), we expect an array.
          if (Array.isArray(updates[key].set)) {
             // It's resetting relationship.
             // We'll strip the "wrapper" and just save the data if possible, or ignore if too complex.
             // In `product-actions.ts`: 
             // categories: { set: [] } -> clears categories
             if (updates[key].set.length === 0) {
                 delete updates[key]; // effectively clear? Or set to empty array?
                 // Wait, real prisma doesn't store the relation on the row usually.
                 // But for JSON DB, embedding is easier for Many-to-Many "reads".
                 // Let's assume we store "categoryIds" or similar if we were relational.
                 // But simply, we can stick 'categories' array on the product object for this "document" DB.
                 current[key] = []; 
             }
         }
       }
       
       if (updates[key]?.connect) {
            // Add to relation
             if (Array.isArray(updates[key].connect)) {
                 if (!current[key]) current[key] = [];
                 // This is tricky without fetching the related objects.
                 // We will need to "resolve" them dynamically or cheat.
                 // For now: assume 'connect' passes IDs or slugs, we need to find them?
                 // In `product-actions.ts`, it connects by {id, slug}.
                 // references: [id]
                 // Let's just append the connected objects' refs?
                 // Or better: Let's actually FIND the related items and store them?
                 // That mimics "include" better if we just embed.
             }
       }
    }

    // Apply simple scalar updates
    for (const key in updates) {
        if (updates[key] && typeof updates[key] === 'object' && !Array.isArray(updates[key]) && !(updates[key] instanceof Date)) {
            // Skip complex relational ops we haven't handled above
            continue; 
        }
        current[key] = updates[key];
    }
    
    current.updatedAt = new Date(); // Auto-update
    
    // Re-process relations if needed
    // specifically for products-categories:
    if (args.data.categories) {
         if (args.data.categories.connect) {
             const catsToConnect = args.data.categories.connect; // Array of {id, slug}
             // Find these categories
             const allCats = this.client.category.getData();
             const newCats = allCats.filter(c => 
                catsToConnect.some((connect: any) => connect.id === c.id || connect.slug === c.slug)
             );
             
             // Merge with existing? Or set?
             // Usually connect adds.
             const existing = current.categories || [];
             // avoid duplicates
             const unique = [...existing];
             for (const nc of newCats) {
                 if (!unique.find(u => u.id === nc.id)) {
                     unique.push(nc);
                 }
             }
             current.categories = unique;
         }
         if (args.data.categories.set) {
             // if set is explicitly empty
             if (Array.isArray(args.data.categories.set) && args.data.categories.set.length === 0) {
                 current.categories = [];
             }
         }
    }

    items[index] = current;
    this.save();
    
    // If include is requested, resolve
    if (args.include) {
        return this.resolveRelations(current, args.include);
    }
    
    return current;
  }

  async delete(args: any) {
    const items = this.getData();
    const index = items.findIndex((item) => this.matchWhere(item, args.where));
     if (index === -1) {
        throw new Error(`Record to delete not found in ${this.modelName}`);
    }
    const deleted = items[index];
    items.splice(index, 1);
    this.save();
    return deleted;
  }
  
  // Helpers

  private matchWhere(item: any, where: any): boolean {
    for (const key in where) {
        const condition = where[key];
        
        if (key === 'OR' && Array.isArray(condition)) {
            if (!condition.some(orCond => this.matchWhere(item, orCond))) {
                return false;
            }
            continue;
        }
        
        if (key === 'AND' && Array.isArray(condition)) { // technically not used in snippets but good to have
             if (!condition.every(andCond => this.matchWhere(item, andCond))) {
                return false;
            }
            continue;
        }

        const itemValue = item[key];

        // Handle simple equality
        if (typeof condition !== 'object' || condition === null || condition instanceof Date) {
            if (itemValue !== condition) return false;
            continue;
        }
        
        // Handle filter operators
        if (condition.equals !== undefined) {
             if (itemValue !== condition.equals) return false;
        }
        
        if (condition.contains !== undefined) {
            const valStr = String(itemValue);
            const searchStr = String(condition.contains);
            if (condition.mode === 'insensitive') {
                if (!valStr.toLowerCase().includes(searchStr.toLowerCase())) return false;
            } else {
                 if (!valStr.includes(searchStr)) return false;
            }
        }
        
        if (condition.in !== undefined && Array.isArray(condition.in)) {
            if (!condition.in.includes(itemValue)) return false;
        }
        
        // Relation filter (e.g. searching product where category matches)
        // Not implemented fully, but basic check might be needed.
    }
    return true;
  }

  private resolveRelations(item: any, include: any) {
    const result = { ...item };
    for (const key in include) {
        if (include[key]) {
            // If the item already has the data embedded (like we did for categories), keep it.
            // Or if it needs fetching.
            // For 'categories' on Product, we embedded them in 'update' / 'create' logic.
            // Check if it exists.
            if (result[key]) continue;
            
            // Try to find reverse relation? 
            // e.g. User -> Session (Session has userId)
            // If we are User, and include sessions.
            if (this.modelName === 'user' && key === 'sessions') {
                 result.sessions = this.client.session.getData().filter(s => s.userId === item.id);
            }
             if (this.modelName === 'user' && key === 'accounts') {
                 result.accounts = this.client.account.getData().filter(a => a.userId === item.id);
            }
            // If we are Session, and include User
            if (this.modelName === 'session' && key === 'user') {
                 result.user = this.client.user.getData().find(u => u.id === item.userId);
            }
            
            // Product -> Categories (embedded or lookup?)
            // If not embedded, we'd need a join table or look at ids.
            // For this simple implementation, forcing embedding on write is safer for Many-to-Many.
            
            // Category -> Products
            if (this.modelName === 'category' && key === 'products') {
                // Products have categories embedded?
                // Need to search all products who have this category
                result.products = this.client.product.getData().filter(p => 
                    p.categories && p.categories.some((c: any) => c.id === item.id)
                );
            }
        }
    }
    return result;
  }

  private async processNestedWrites(data: any) {
      // Very basic handling for 'connect' during create
      const processed = { ...data };
      
      // Special logic for categories on product create
      if (this.modelName === 'product' && data.categories && data.categories.connect) {
           const catsToConnect = data.categories.connect; 
             const allCats = this.client.category.getData();
             const resolvedCats = allCats.filter(c => 
                catsToConnect.some((connect: any) => connect.id === c.id || connect.slug === c.slug)
             );
             processed.categories = resolvedCats;
             // Remove the 'connect' syntax structure
             // data.categories is now the array of objects
      } else if (data.categories) {
          // If pure array passed?
      }
      
      return processed;
  }
}

export class JsonClient {
  public data: DbData;
  public user: JsonModel;
  public session: JsonModel;
  public account: JsonModel;
  public verification: JsonModel;
  public product: JsonModel;
  public category: JsonModel;
  public sale: JsonModel;

  constructor() {
    this.data = this.loadData();
    
    this.user = new JsonModel("user", this);
    this.session = new JsonModel("session", this);
    this.account = new JsonModel("account", this);
    this.verification = new JsonModel("verification", this);
    this.product = new JsonModel("product", this);
    this.category = new JsonModel("category", this);
    this.sale = new JsonModel("sale", this);
  }

  private loadData(): DbData {
    if (!fs.existsSync(DB_PATH)) {
      console.log("DB_PATH not found:", DB_PATH);
      // Should exist if we ran the setup, but fallback
      return { user: [], session: [], account: [], verification: [], product: [], category: [], sale: [] };
    }
    try {
        const fileContent = fs.readFileSync(DB_PATH, "utf-8");
        console.log("Loaded DB from:", DB_PATH, "Length:", fileContent.length);
        const data = JSON.parse(fileContent);
        return this.parseDates(data);
    } catch (e) {
        console.error("Failed to load db.json", e);
        return { user: [], session: [], account: [], verification: [], product: [], category: [], sale: [] };
    }
  }

  private parseDates(data: any): any {
    if (data === null || data === undefined) return data;
    if (typeof data === 'string') {
        // Simple ISO date regex check
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (isoDateRegex.test(data)) {
            return new Date(data);
        }
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(item => this.parseDates(item));
    }
    if (typeof data === 'object') {
        const result: any = {};
        for (const key in data) {
            result[key] = this.parseDates(data[key]);
        }
        return result;
    }
    return data;
  }

  public save() {
    try {
        // Debounce? Or sync for safety? Sync for now.
        fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
    } catch (e) {
        console.error("Failed to save db.json", e);
    }
  }
  
  // Transaction stub
  async $transaction(fn: any) {
    if (typeof fn === 'function') {
        return fn(this);
    }
    // If array of promises
    if (Array.isArray(fn)) {
        return Promise.all(fn);
    }
  }
}
