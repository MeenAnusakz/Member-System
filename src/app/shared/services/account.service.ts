import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister, IUser, IChanepass, SearchUser, IUSERS } from 'src/app/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  mockUser:IUser[] = [
    {
      id:'1',
      firstname:'meen',
      lastname:'anusak',
      email:'meen@mail.com',
      password:'123456',
      image:null,
      role:'admin'
    },
    {
      id:'2',
      firstname:'member',
      lastname:'member',
      email:'member@mail.com',
      password:'123456',
      image:null,
      role:'member'
    },
    {
      id:'3',
      firstname:'meen1',
      lastname:'anusak1',
      email:'meen1@mail.com',
      password:'123456',
      image:null,
      role:'admin'
    }
  ]


  constructor() { this.generateUser() }

  onLogin(modelLogin){
    return new Observable<any>(result =>{
     const userLogin = this.mockUser.find(item => item.email === modelLogin.email && item.password === modelLogin.password)
     if(!userLogin) return result.error({message:'อีเมลผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'})
      result.next(userLogin)
    })
  }

  onRegister(modelRegister:IRegister){
    return new Observable(result=>{
      console.log(modelRegister)
      result.next();
    })
  }

  getUserLogin(accessToken:string){
    return new Observable<IUser>(result =>{
      const User = this.mockUser.find(user => user.id === accessToken);
      if(!User) return result.error({message:'AccessToken ไม่ถูกต้อง'})
      result.next(User)
    })
  }

  getUser(accessToken:string,option?:SearchUser){
    return new Observable<IUSERS>(result =>{
      let users = this.mockUser;
      const startItem = (option.startPage - 1) * option.limitPage;
      const endItem = option.startPage * option.limitPage;

     if(option.searchText && option.searchType){
       users = this.mockUser.filter(item => item[option.searchType]
        .toString().toLowerCase()
        .indexOf(option.searchText.toString().toLowerCase()) >= 0);
     }
      result.next({user:users.slice(startItem,endItem),usertotal:users.length})
    })
  }

  updateProfile(accessToken:string,model:IUser){
    return new Observable(result =>{
      const user = this.mockUser.find(user => user.id === accessToken);
      if(!user) return result.error({messgae:'ไม่พบผู้ใช้งานนี้ในระบบ'})
      user.firstname = model.firstname;
      user.lastname = model.lastname;
      user.email = model.email;
      user.image = model.image;
      user.role = model .role;
      result.next(user)
    })
  }

  changePassword(accessToken:string,model:IChanepass){
    return new Observable(result=>{
      const user = this.mockUser.find(user => user.id === accessToken);
      if(!user) return result.error({messgae:'ไม่พบผู้ใช้งานนี้ในระบบ'});
      if(user.password !==  model.old_pass) return result.error({message:'รหัสผ่านเดิมไม่ถูกต้อง'})
      user.password = model.new_pass;
      result.next(user);
    })
  }

  private generateUser(){
    this.mockUser.splice(3)
    for (let i = 4; i <=300 ; i++) {
      this.mockUser.push({
        id:i.toString(),
        firstname:`fname${i}`,
        lastname:`lname${i}`,
        email:`mail${i}@mail.com`,
        password:`123456`,
        image:null,
        role:'member'
      })
    }
  }
}
