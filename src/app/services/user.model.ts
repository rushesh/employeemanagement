import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class User {

    constructor(
        public email:string,
        public id :string,
        private _token:string,
        private _tokenExpirationDate: Date
        ){}

        get token(){
            if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
                return null;
            }
            return this._token;
        }
}