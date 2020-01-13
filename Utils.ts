export interface Chain {
    next(), 
    prev(), 
    skip(stops: number, forward: boolean)
}

export class Chains {
    public static skip(start: Chain, stops: number, forward: boolean = true): any {
        let current = start;
        for(var i=0; i < stops; i++){
            current = forward ? current.next() : current.prev();
        } 
        return current;   
    }
}

export class Rings {
    public static next(current: any, space: any): any {
        let result: any = undefined;
        const index = space.indexOf(current);
        if(index >= 0 && index < space.length - 1) {
            result = space[index + 1];
        } else {
            result = space[0];
        }
        return result;
    }

    public static prev(current: any, space: any): any {
        let result: any = undefined;
        const index = space.indexOf(current);
        if(index >= 1 && index < space.length) {
            result = space[index - 1];
        } else {
            result = space[space.length - 1];
        }
        return result;
    }
}

export function enumToArray<T>(t: T): ReadonlyArray<T[keyof T]> {
    const values = Object.values(t);
    return values.some(x => typeof x === 'number')
      ? values.filter(x => typeof x === 'number')
      : values;
  }

