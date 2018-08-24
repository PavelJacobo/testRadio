import { Usuario } from './modelo.index';

export class Programa {
    constructor (
        public nombre: string,
        public contenido: string,
        public colaboradores?: Usuario[],
        public fecha?: Array<string>,
        public img?: string,
        public _id?: string
    ) {}
}
