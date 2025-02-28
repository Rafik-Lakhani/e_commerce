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
    required: true,
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
    required: true,
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    placeholder: "Select product category",
    required: true,
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
    required: true,
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
    required: true,
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
    required: false,
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
    required: true,
  },
];
