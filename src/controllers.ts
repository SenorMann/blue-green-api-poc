const items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};


export default {
  async findAll(): Promise<Item[]> {
    return Object.values(items);
  },

  async find(id: number): Promise<Item> {
    return items[id];
  },

  create(newItem: BaseItem): Item {
    const id = new Date().valueOf();
  
    items[id] = {
      id,
      ...newItem,
    };
  
    return items[id];
  },

  async update(
    id: number,
    itemUpdate: BaseItem
  ): Promise<Item | null> {
    const item = await this.find(id);
  
    if (!item) {
      return null;
    }
  
    items[id] = { id, ...itemUpdate };
  
    return items[id];
  },

  async remove(id: number): Promise<null | void> {
    const item = await this.find(id);
  
    if (!item) {
      return null;
    }
  
    delete items[id];
  },
}
