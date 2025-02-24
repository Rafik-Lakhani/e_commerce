export const RegisterFormControls = [
  {
    type: 'text',
    name: 'userName',
    label: 'Username',
    required: true,
    placeholder: 'Enter your username',
    componentType: 'input',
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    placeholder: 'Enter your email',
    componentType: 'input',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    placeholder: 'Enter your password',
    componentType: 'input',
  }
]


export const LoginFormControls = [
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    placeholder: 'Enter your email',
    componentType: 'input',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    placeholder: 'Enter your password',
    componentType: 'input',
  }
];


export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "school-bag", label: "School Bag" },
      { id: "laptop-bag", label: "Laptop Bag" },
      { id: "traveling-bag", label: "Traveling Bag" },
      { id: "ladies-purse", label: "Ladies Purse" },
      { id: "college-bag", label: "College Bag" },
      { id: "kids-bag", label: "Kids Bag" },
      { id: "office-bag", label: "Office Bag" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "input",
    type: "text",
    placeholder: "Enter product Brand Name",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
