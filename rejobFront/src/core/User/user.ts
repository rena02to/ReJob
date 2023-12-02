enum Role {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER',
  }
  
  class User {
    id!: number;
    name!: string;
    role!: Role;
    email!: string;
    password!: string;
    createdDate!: Date;
    lastUpdatedDate!: Date;
  }
  
  export { User, Role };