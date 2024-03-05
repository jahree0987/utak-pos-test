
export interface AllMenuItems {
    name:         string;
    description:  string;
    price:        string;
    sizes:        Size[];
    stock:        string;
    cost:         string;
    image:        string;
    category:     string;
    keys:         string;
    categoryKeys?: string;
    menuKeys?:     string | undefined;
    menuItemID?:   string | undefined;
}

export enum Size {
    Large = "Large",
    Medium = "Medium",
    Small = "small",
}
