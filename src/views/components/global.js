export var global = 0;
var previous=0 ;

export const updateGlobal = (sc) => {
    global = sc == 0 ? previous + global : sc
    previous = sc
}

export const getglobalScore= (sc) =>{
    return global
}

export const updateOnce = (sc) => {
    global = global+sc

}