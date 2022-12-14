class Base{
    constructor(nombre, minutos) {
        this.nombre=nombre;
        this.minutos=minutos;
        this.next=null;
        this.prev=null;
    }
}

class listaBases{
    constructor() {
        this.primero=null;
        this.ultimo=null;
    }
    agregar(nuevo) {
        if(this.primero==null) {
            this.primero=nuevo;
            this.ultimo=nuevo;
            nuevo.next=nuevo;
            nuevo.prev=nuevo;
        } else {
            nuevo.prev=this.ultimo;
            nuevo.next=this.primero;
            this.ultimo.next=nuevo;
            this.primero.prev=nuevo;
            this.ultimo=nuevo;
        }
    }
    buscar(base) {
        let auxPri=this.primero;
        let auxUlt=this.ultimo;
        while(auxPri.nombre!=base && auxUlt.nombre!=base) {
            auxPri=auxPri.next;
            auxUlt=auxUlt.prev;
            if(auxUlt.next==auxPri) {
                return "No bases encontradas";
            }
        }
        if(auxPri.nombre==base) {
            return auxPri;
        } else if(auxUlt.nombre==base) {
            return auxUlt;
        }
    }
    eliminar(base) {
        let find=this.buscar(base);
        if(find=="No bases encontradas") {
            console.log(find);
        } else {
            if(find.next==find) {
                this.primero=null;
                this.ultimo=null;
            } else {
                find.next.prev=find.prev;
                find.prev.next=find.next;
                if(find==this.ultimo) {
                this.ultimo=find.prev;
                } else if(find==this.primero){
                this.primero=find.next;
                }
            }
        }
    }
    imprimir() {
        let list = "";
        let aux=this.primero;
        if(aux==null) {
            return "Sin Bases Agregadas";
        }
        while(aux!=this.ultimo) {
            list+=`[${aux.nombre}-${aux.minutos} min], `;
            aux=aux.next;
        }
        list+=`[${aux.nombre}-${aux.minutos} min]`;
        return list;
    }
    recorrido(baseInicio, horaInicio, minutoInicio, horaFin, minutoFin) {
        let base=this.buscar(baseInicio);
        let hora=horaInicio;
        let minuto=minutoInicio;
        console.log(`Inicio: ${base.nombre} Hora: ${hora}:${minuto}`);
        while(hora!=horaFin || minuto<minutoFin) {
            minuto+=base.minutos;
            if(minuto>=60) {
                hora++;
                minuto-=60;
            }
            base=base.next;
            if(minuto>=10) {
                console.log(`Base: ${base.nombre} Hora: ${hora}:${minuto}`);
            } else {
                console.log(`Base: ${base.nombre} Hora: ${hora}:0${minuto}`);
            }
        }
    }
}

//DATA DATA DATA DATA DATA DATA DATA DATA DATA DATA
let bases=new listaBases();
let base = new Base("UDC", 15);
bases.agregar(base);
base=new Base("San Fernando", 15);
bases.agregar(base);
base=new Base("Liverpool", 15);
bases.agregar(base);
base=new Base("Centro", 10);
bases.agregar(base);
base=new Base("Central Rojos", 15);
bases.agregar(base);
base=new Base("Parque Hidalgo", 20);
bases.agregar(base);

//TESTS TESTS TESTS TESTS TESTS TESTS TESTS TESTS TESTS
console.log(bases.imprimir());
console.log(bases.buscar("Parque Hidalgo"));

bases.eliminar("Parque Hidalgo");
console.log(bases.imprimir());

bases.recorrido("UDC", 8, 10, 10, 40);