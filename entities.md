### CoreEntity [+]

- id: number
- createdAt: Date
- updatedAt: Date

enum UserRoles = "guest", "customer", "manager", "administrator"

### User []

- isActive: boolean: default=true
- email: string
- password: string
- firstName: string
- lastName: string: nullable
- role: UserRole: default="guest"

### Product extends CoreEntity []

- isActive: boolean: default=true
- isNew: boolean: default=false
- isPopular: boolean: default=false
- title: string
- description: string: nullable
- inStock: number: default=0
- basePrice: number
- discountPrice: number: nullable
- sku: string
- category: Category
- images: ProductImage[]
- sizes: ProductSize[]
- relatedProducts: Product[]

### Category extends CoreEntity [+]

- isActive: boolean: default=true
- title: string
- slug: string

### Size extends CoreEntity [+]

- isActive: boolean: default=true
- title: string
- slug: string

### ProductImage extends CoreEntity []

- isMain: boolean
- src: string
- alt: string
- product: Product

### ProductSize extends CoreEntity []

- title: string
- slug: string
- price: number: boolean
- product: Product

### Favorite extends CoreEntity []

- user: User
- product: Product

### Order extends CoreEntity []

- status: OrderStatus: enum
- products: OrderProduct[]
- address: OrderAddress

### OrderProduct extends CoreEntity []

- count: number
- price: number
- order: Order
- product: Product

### OrderAddress extends CoreEntity []

- city: string
- postDepartment: string
- order: Order
