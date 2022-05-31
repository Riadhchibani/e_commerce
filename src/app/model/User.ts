import { Role } from './Role';

export class User {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public email?: string,
        public age?: number,
        public date?: Date,
        public tel?: number,
        public username?: string,
        public password?: string,
        public code?: string,
        public role?: Role,
        public etat?: boolean
    ) { }

}