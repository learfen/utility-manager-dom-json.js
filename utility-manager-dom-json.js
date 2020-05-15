/**
    Autor: <leafen001@gmail.com> Daniel Garcia
*/
var dataStore = new Object({registers:{}})
function data(k , v){
    if(v != undefined){
        for(let a of $.nodes(`*[listen=${k}]`)){
            a.innerHTML = v
        }
        if(dataStore.registers[k]){
            for(let a of dataStore.registers[k]){
                a.push(v)
            }
        }
        dataStore[k]=v
    }
    if(k){return  dataStore[k] }
}
function listenChilds(key , obj){
    if(!obj.push){ console.log("No tiene la funcion push" , obj) }
    if(!dataStore.registers[key]){ dataStore.registers[key] = []}
    dataStore.registers[key].push(obj)
    obj.push(dataStore[key])
}

class ${
    static replaceAll(target, search, replacement) {
        return target.replace(new RegExp(search, 'g'), replacement);
    }
    static nodeNew(n){
        let a = n[Object.keys(n)[0]]
        let h = ''
        n = Object.keys(n)[0]
        if(a.hasOwnProperty('text')){
            h = a.text
            delete a.text
        }
        if(a.hasOwnProperty('listen')){
            h = data(a.listen)
        }
        let node = document.createElement(n)
        let childs = []
        if(a.in){
            childs = a.in
            delete a.in
        }
        if(a != undefined){
            for(let attrs in a){
                node.setAttribute(attrs, a[attrs])
            }
        }
        node.push = n_push
        node.innerHTML = h
        if(childs.length > 0){
            for(let child of childs){
                let childInsert = child
                if( !child.innerHTML ){
                    childInsert = $.nodeNew(child)
                }
                node.appendChild( childInsert )
            }
        }
        activable()
        return node
    }
    static nodePush(n, q){
        let nodo = $.nodeNew(n)
        if(typeof q == 'string'){
            $.node(q).appendChild(nodo)
        }else{
            q.appendChild(nodo)
        }
        return nodo
    }
    static nodeUnshift(n, q){
        let nodo = $.nodeNew(n)
        if(typeof q == 'string'){
            $.node(q).prepend(nodo)
        }else{
            q.prepend(nodo)
        }
        return nodo
    }
    static node(q){ 
        let nodo = document.querySelector(q);
        if(nodo != undefined){  nodo.push = n_push;     }
        if(nodo != undefined){  nodo.unshift = n_unshift;     }
        return nodo
    }
    static nodes(q){ return document.querySelectorAll(q); }
    static random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static nodeActive(q){
        let qq = typeof q == 'string' ? $.node(q) : q
        qq.classList.add('active')
        if(qq.classList.contains('modal')){
            $.node('body').style.overflow = 'hidden'
        }
        setTimeout( ()=> {
            qq.classList.add('active-ready')
        }, 500)
    }
    static nodeInactive(q){
        let qq = typeof q == 'string' ? $.node(q) : q
        if(qq != null){
            qq.classList.add('inactive')
            setTimeout( ()=> {
                qq.classList.remove('active-ready')
                if(qq.classList.contains('modal')){
                    $.node('body').style.overflow = 'hidden'
                }
            }, 250)
            setTimeout( ()=> {
                qq.classList.remove('active')
                qq.classList.remove('inactive')
            }, 500)
        }
    }
    static nodeToggle(q){
        let qq = typeof q == 'string' ? $.node(q) : q
        qq = $.node('.modal.active') == undefined ? qq : $.node('.modal.active')
        qq = $.node('.help.active') == undefined ? qq : $.node('.help.active')
        if(qq != null){
            if(qq.className.search('active')>-1){
                $.nodeInactive(q)
                return 'inactive'
            }else{
                $.nodeActive(q)
                return 'active'
            }
        }
    }
    static arrayLast(a, n=0){
        return a[a.length - (1 + n)]
    }
    static print(...c){
        for(let a of c){
            console.log(a)
        }
    }
}

function activable(){
    for(let a of $.nodes('*[activable]')){
        a.onclick = (e)=>{
            let obj = e.target.activable == '' ? e.target : e.target.getAttribute('activable').split(',')
            for(let a of obj){
                if(a[0] == '!'){
                    $.nodeInactive( a.replace('!','') )    
                }else{
                    $.nodeToggle( a )
                }
            }
        }
    }
}

function eventsAdded(){
    activable()
}

function n_push (n){

    this.appendChild(n)
    return this
}

function n_unshift (n){
    this.prepend(n)
    return this
}

class Box{
    constructor(query , insertIn ){
        query = query.split(" is ")
        let tagDescript = query[1].trim().split(">")
        let newNodo = {}
        newNodo[tagDescript[0]] = {id:query[0].trim()}
        this.nodo = $.nodeNew( newNodo )
        if( insertIn != undefined ){ $.node(insertIn).push(this.nodo)}
        
        this.child = tagDescript[1].trim() != "" ? tagDescript[1].trim() : "div"

        this.children = []
    }
    push(c){
        if(this.nodo.children){
            for(let a of this.nodo.children){
                a.remove()
            }
        }
        for(let a of c){
            let nodo = {}
            nodo[this.child] = a
            $.nodePush(nodo , this.nodo)
        }
    }
}

function example(){
    $.nodePush({div:{id:"body"}} , document.body)

    let select = new Box('miselect is select>option' , "#body")
    listenChilds("selectOptions" , select)
    let btn = $.nodeNew( {button:{id:"test-btn-data" , text:"change data"}} )

    btn.onclick = e => {
        data("mytext" , "laura")
        data("selectOptions" , [ 
            {value:"nuevo2", text:"nuevo text 2"} ,
            {value:"nuevo3", text:"nuevo text 3"} ,
            {value:"nuevo4", text:"nuevo text 4"} ,
        ])
    }

    let other = {div:{listen:"mytext"}}
    $.nodePush({
        div:{in:[
            {"a":{ href:"www.google.com", in:[
                    { span:{text:"nuevo"} }
                ]}},
            select.nodo,
            other , 
            btn
            ] , text:"hola"}
    } , "#body")
}

data("mytext","daniel")
data("selectOptions" , [ {value:"nuevo1", text:"nuevo text 1"} ] )
example()