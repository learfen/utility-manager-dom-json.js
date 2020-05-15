/**
    Autor: <leafen001@gmail.com> Daniel Garcia
*/
var dataStore = new Object({registers:{}})
function data(k , v){
    if(v != undefined){
        if(dataStore.registers[k] != v){
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
    static arrayLast(a, n=0){
        return a[a.length - (1 + n)]
    }
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
        if(this.nodo.children.length){
            for(let a of this.nodo.children){
                a.remove()
            }
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
        if(count == 0){
            data("mytext" , "laura")
            data("selectOptions" , [ 
                {value:"nuevo2", text:"nuevo text 2"} ,
                {value:"nuevo3", text:"nuevo text 3"} ,
                {value:"nuevo4", text:"nuevo text 4"} ,
            ])
        }
        if(count == 1){
            data("selectOptions" , [ 
                {value:"nuevo1", text:"hola"} ,
            ])
        }
        count++
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

var count = 0
data("mytext","daniel")
data("selectOptions" , [ {value:"nuevo1", text:"nuevo text 1"} ] )
example()