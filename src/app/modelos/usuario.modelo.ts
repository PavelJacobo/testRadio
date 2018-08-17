export class Usuario {
    constructor(
        public  nombre: string,
        public  email: string,
        public role?: string,
        public  password?: string,
        public programa?: string,
        public img?: string,
        public _id?: string
    ) {}

}
