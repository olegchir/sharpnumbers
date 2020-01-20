import * as u from './Utils';

// В равномерно-темперированном строя есть всего 12 тонов.
// Это 9 тонов, которые пришли к нам от простой флейты 
// (у человека только 8 пальцев чтобы на ней играть + открытый звук).
// И еще несколько чтобы было не так убого.
export enum PitchSpace {
    A, AB, B, C, CD, D, DE, E, F, FG, G, GA
}

// Тоны выстраиваются в упорядоченное кольцо, и о каждом тоне можно говорить отдельно
// О тонах можно думать как о чем-то физическом - например, о клавишах на фортепиано
export class Tone implements u.Chain {
    public readonly tone_: string;
    private constructor(
        public readonly tone: PitchSpace, // Тон
        public readonly base: boolean = true, // Находится ли нота на "белых" клавишах
    ) { 
        this.tone_ = this.spellTone(); // В целях отладки этой программы, смотреть JSON в браузере
    }

    // Если не учитывать октаву, то у нас есть 12 основных тонов
    static readonly A  = new Tone(PitchSpace.A);
    static readonly AB  = new Tone(PitchSpace.AB, false);
    static readonly B  = new Tone(PitchSpace.B);
    static readonly C  = new Tone(PitchSpace.C);
    static readonly CD  = new Tone(PitchSpace.CD, false);
    static readonly D  = new Tone(PitchSpace.D);
    static readonly DE  = new Tone(PitchSpace.DE, false);
    static readonly E  = new Tone(PitchSpace.E);
    static readonly F  = new Tone(PitchSpace.F);
    static readonly FG  = new Tone(PitchSpace.FG, false);
    static readonly G  = new Tone(PitchSpace.G);
    static readonly GA  = new Tone(PitchSpace.GA, false);

    // Они организуют звуковысотную систему, в которой идут строго по порядку
    static readonly Space = [
        Tone.A, 
        Tone.AB, 
        Tone.B, 
        Tone.C, 
        Tone.CD, 
        Tone.D, 
        Tone.DE, 
        Tone.E, 
        Tone.F, 
        Tone.FG, 
        Tone.G, 
        Tone.GA
    ];

    // Виды тонов закольцованы: после последнего идёт первый, но в более высокой октаве.    
    // Сейчас мы говорим об абстрактном кольцевом порядке, поэтому никаких октав здесь нет.
    public next(): Tone {
        return u.Rings.next(this, Tone.Space);
    }
    public prev(): Tone {
        return u.Rings.prev(this, Tone.Space);
    }
    public skip(stops: number, forward: boolean = true): Tone {
        return u.Chains.skip(this, stops, forward);
    }
    
    // Печатать на экране тон будем так
    public spellTone(): string {
        return PitchSpace[this.tone];
    } 
    public toString(): string {
        return `${ this.spellTone() }`;
    }
}

// Диез и бемоль - это знаки альтерации, указывающие на повышение или понижение какой-то ступени.
export enum Accidental {
    NATURAL = "NATURAL",
    SHARP = "SHARP",
    FLAT = "FLAT"
}

// Нота - это тон звука и его графическая репрезентация
// Ключевое отличие в том, что один и тот же тон можно записать разными нотами
// Фа, ми диез, соль дубльбемоль - это один и тот же звук, но запись у них различается
//
// Неинтуитивная проблема: если в "тоне" у вас написано "ля бемоль",
// и в знаке альтерации тоже стоит "бемоль", то вместе получится нота "ля бемоль бемоль".
// Скорей всего, это проблема в моем понимании вопроса. 
// Пока что это нормально работает и позволяет делать дубльбемоли, но может дико бахнуть в будущем.
// Но скорей всего вы хотите использовать в поле "тон" только семь белых клавиш :)
export class Note {
    public constructor(
        public tone: Tone,
        public accidental: Accidental,
        public octave: number = 0
    ) {}
}

// Музыкальный ключ в смысле европейской классики - 
// это принцип выбора и записи конкретных тонов
// Тональности бывают диезные, бемольные и без знаков - 
// в зависимости от того, чем мы в основном будем пользоваться.
//
// На самом деле, связь между знаками альтерации и ключом не нужна в алгоритмах
// Я сделал равенство просто чтобы вы не забывали
export enum SKey {
    NATURAL = Accidental.NATURAL,
    SHARP = Accidental.SHARP,
    FLAT = Accidental.FLAT
}

// Mузыкальный лад (mode) - это принцип, по которому мы выбираем звуки из набора.
// За основу берется полный звукоряд (scale), а дальше от некого базового звука ("тоники")
// него откладываются интервалы по определенному принципу, но *оставаясь в пределах ключа*.
// Мы будем называть Ионийский лад "мажором", а Эолийский лад - "минором"
// просто потому, что так проще говорить.
export enum SMode {
    MAJOR, //Ionian. Starts on the Tone for which the key is named (C in the key of C), WWHWWWH    
    // DORIAN, //Next Tone after tonic (D). WHWWWHW.
    // PHRYGIAN, // The Tone one major third higher than the tonic (E). HWWWHWW.
    // LYDIAN, // One perfect fourth higher than the tonic (F). WWWHWWH.     
    // MIXOLYDIAN, // One perfect fifth higher than the tonic (G). WWHWWHW
    MINOR, // Aeolian. One major sixth higher than the tonic (A). WHWWHWW
    // LOCRIAN // One major seventh higher than the tonic (B). HWWHWWW
}

// Повышенные и пониженные ступени (диезы и бемоли) 
// в мажоре и миноре появляются в очень конкретном порядке
export enum Sharps {
    F = PitchSpace.F, 
    C = PitchSpace.C, 
    G = PitchSpace.G, 
    D = PitchSpace.D, 
    A = PitchSpace.A, 
    E = PitchSpace.E, 
    B = PitchSpace.B
}
export enum Flats {
    B = PitchSpace.B, 
    E = PitchSpace.E, 
    A = PitchSpace.A, 
    D = PitchSpace.D, 
    G = PitchSpace.G, 
    C = PitchSpace.C, 
    F = PitchSpace.F
}

// Цель этой работы - получить ответ вот в таком виде: 
// набор знаков альтерации + их тип
export class AccidentalSet {
    public constructor(
        public accidentals: PitchSpace[],
        public key: SKey        
        ) { }   
        
    // Этой штукой будем печатать в места, где не нужен весь этот тайпскрипт
    public prettyJSON():any {
        return {
            "accidentals": PitchSpace.strings(this.accidentals),
            "key": this.key
        }
    }
}

// Тональность можно зафиксировать в описанных выше координатах.
// Весь код, который здесь находится, можно было бы не писать, а представить результаты в виде таблицы.
// Цель этого упражнения (я пишу этот код как упражнение!) в том, чтобы понять, как *человеку* всё это запомнить.
// Очевидно, запоминать огромные таблицы - не вариант.
// Поэтому весь код этого класса - одна большая эвристика, распиханная по куче методов для удобства чтения. 
export class Tonality {

    // Тональность определяется через тонику и лад. 
    // Пока что мы умеем работать только с мажором и минором.
    public constructor(
        public tonic: Note,
        public mode: SMode,
        ) { }

    // Это самая важная функция в этом классе! 
    // Она отвечает на вопрос: какие же знаки используются.
    // Сейчас вы увидите общую схему решения, а детали пойдут ниже.
    public accidentals(): AccidentalSet {  

        // Эта строчка - манифест беспомощности изучения музыки по школьному учебнику
        // Всё, с чем мы не умеем работать - просто пропускается
        if (this.isTeoretical()) {
            return undefined;
        } 
        
        // Мы пока умеем работать только с мажором и минором
        if (this.mode == SMode.MAJOR) {
            return this.majorAccidentals();
        } else if (this.mode == SMode.MINOR) {
            return this.minorAccidentals();
        }
        
        return undefined;
    }

    // Это список тональностей, с которыми мы не умеем пока работать
    // Целых одиннадцать штук, которые не входят в "стандартные 30"
    // Очевидно, что теоретические тональности вроде ми диез мажора - существуют
    // Что с ними делать - пока непонятно вообще. 
    // Надо заводить новые ключи для дубльдиезных и дубльбемольных тональностей и думать
    // (а в идеале - N-альтеративных тональностей, для N > 2 и количества знаков альтерации > 3).
    public isTeoretical(): boolean {
        let teoset:Tonality[] = [];
        // A-sharp major
        teoset.push(new Tonality(new Note(Tone.A, Accidental.SHARP), SMode.MAJOR));
        // B-sharp major
        teoset.push(new Tonality(new Note(Tone.B, Accidental.SHARP), SMode.MAJOR));
        // B-sharp minor
        teoset.push(new Tonality(new Note(Tone.B, Accidental.SHARP), SMode.MINOR));
        // C-flat minor
        teoset.push(new Tonality(new Note(Tone.C, Accidental.FLAT), SMode.MINOR));
        // D-sharp major
        teoset.push(new Tonality(new Note(Tone.D, Accidental.SHARP), SMode.MAJOR));
        // E-sharp major
        teoset.push(new Tonality(new Note(Tone.E, Accidental.SHARP), SMode.MAJOR));
        // E-sharp minor
        teoset.push(new Tonality(new Note(Tone.E, Accidental.SHARP), SMode.MINOR));
        // F-flat major
        teoset.push(new Tonality(new Note(Tone.F, Accidental.FLAT), SMode.MAJOR));
        // F-flat minor
        teoset.push(new Tonality(new Note(Tone.F, Accidental.FLAT), SMode.MINOR));
        // G-flat minor
        teoset.push(new Tonality(new Note(Tone.G, Accidental.FLAT), SMode.MINOR));
        // G-sharp major
        teoset.push(new Tonality(new Note(Tone.G, Accidental.SHARP), SMode.MAJOR));

        for (let i=0; i<teoset.length; i++) {
            let t = teoset[i];
            if (t.tonic.tone == this.tonic.tone &&
                t.tonic.accidental == this.tonic.accidental &&
                t.mode == this.mode) {
                    return true;
                }
        }
    
        return false;
    }

    // Ищем ключ мажорных тональностей
    // Совершенно кринжовая эвристика, facepalm.jpg
    // Под этой эвристикой нет никакой математики, это тупо - посмотрел на таблицу, нашел каких тональностей больше
    public findMajorKey(): SKey {
        // До мажор и ля минор не имеют знаков при ключе
        if ( this.tonic.tone == Tone.C && this.tonic.accidental == Accidental.NATURAL && this.mode == SMode.MAJOR ) {
            return SKey.NATURAL;
        }
        // Фа мажор - бемольная тональность, хотя в ее названии и нет слова "бемоль"
        if ( (this.tonic.tone == Tone.F && this.tonic.accidental == Accidental.NATURAL && this.mode == SMode.MAJOR) ) {
            return SKey.FLAT;
        }
        // Не считая исключений, если в названии тональности есть бемоль - она бемольная
        if (this.tonic.accidental == Accidental.FLAT) {
            return SKey.FLAT;
        }
        // Все остальные тональности - диезные
        return SKey.SHARP;
    }

    // Ищем ключ минорных тональностей
    // Совершенно кринжовая эвристика, facepalm.jpg
    // Под этой эвристикой нет никакой математики, это тупо - посмотрел на таблицу, нашел каких тональностей больше    
    public findMinorKey(): SKey {
        // До мажор и ля минор не имеют знаков при ключе
        if (this.tonic.tone == Tone.A && this.tonic.accidental == Accidental.NATURAL && this.mode == SMode.MINOR) {
            return SKey.NATURAL;
        }
        // Ми минор и си минор - диезные
        if ( (this.tonic.tone == Tone.E && this.tonic.accidental == Accidental.NATURAL && this.mode == SMode.MINOR) ||
             (this.tonic.tone == Tone.B && this.tonic.accidental == Accidental.NATURAL && this.mode == SMode.MINOR)) {
            return SKey.SHARP;
        }
        // Не считая исключений, если в названии тональности есть диез - она диезная
        if (this.tonic.accidental == Accidental.SHARP) {
            return SKey.SHARP;
        }
        // Все остальные тональности - бемольные
        return SKey.FLAT;
    }

    //Ищем знаки мажорных тональностей (для минорных в этом коде алгоритма нет)
    public minorAccidentals(): AccidentalSet {
        let result = undefined;
         // Ничтоже сумняшеся находим ключ тональности
         let key = this.findMinorKey();
        
         // В натуральных тональностях знаки не используются
         if (key == SKey.NATURAL) {
             result = new AccidentalSet([], key);
         } else {             
            // Для минора можно было бы найти свою удобную эвиристику,
            // Но на практике проще найти параллельный ему мажор (т.е. с тем же набором знаков)
            let parallelMajor = this.findParallelMajor(key);
            result = parallelMajor.accidentals();            
         }          

         return result;
    }

    // Ищем параллельный мажор, сохраняя ключ
    // Это ещё более кринжовая идея, придуманная исключительно от отчаяния
    public findParallelMajor(key: SKey): Tonality {   
        let oldTone = toneFromNote(this.tonic); // Пробуем получить тон, применив альтерацию к основному тону
        let newTone = oldTone.skip(3); // Строим малую терцию вверх
        let newNote = noteFromTone(newTone, key); // Пробуем получить ноту, выставив знак альтерации, похожий на ключ
        return new Tonality(newNote, SMode.MAJOR);
    }

    //Ищем знаки мажорных тональностей (для минорных в этом коде алгоритма нет, не ищите)
    public majorAccidentals(): AccidentalSet {
        let result = undefined;
         // С помощью простой эвристики находим ключ тональности
         let key = this.findMajorKey();
        
         // В натуральных тональностях знаки не используются
         // Для диезных и бемольных тональностей есть два различных алгоритма
         if (key == SKey.NATURAL) {
             result = new AccidentalSet([], key);
         } else if (key == SKey.SHARP) {
             result = this.majorSharpAccidentals();
         } else if (key == SKey.FLAT) {
             result = this.majorFlatAccidentals();
         }          

         return result;
    }

    // Ветка алгоритма про мажорные диезы
    public majorSharpAccidentals(): AccidentalSet {
        const result:PitchSpace[] = [];

        // В диезных тональностях последний диез - на ноту ниже, чем тоника
        // (Диез - это не ступень сама по себе, а команда повышать какую-то ступень
        // Поэтому прыгать нужно не на один полутон, а на два. Так надо.)
        const lastSharpTone = toneFromNote(this.tonic)
        const lastSharp = lastSharpTone.prev().prev();

        // мой тайпскрипт не очень хорош
        const lastSharpValue: number = lastSharp.tone; 
        let sharpz = u.enumToArray(Sharps);  

        // Собираем все диезы вплоть до "последнего", включая его самого
        for (let i=0; i < sharpz.length; i++) {
            let currSharp = sharpz[i];
            result.push(PitchSpace[Sharps[currSharp]]);            
            if (currSharp == lastSharpValue) {
                break;
            }
        }   
        
        return new AccidentalSet(result, SKey.SHARP);
    }

    // Ветка алгоритма про мажорные бемоли
    public majorFlatAccidentals(): AccidentalSet {
        const result:PitchSpace[] = [];
    
        // Фа-мажор - это исключение, в котором есть всего один бемоль
        if ( (this.tonic.tone == Tone.F && this.tonic.accidental == Accidental.NATURAL && this.mode == SMode.MAJOR) ) {            
            result.push(PitchSpace[Flats[Flats.B]]);
            return new AccidentalSet(result, SKey.FLAT);
        }

        // В бемольных тональностях предпоследний бемоль - тоника.
        const lastFlat = this.tonic.tone;

        // мой тайпскрипт не очень хорош
        const lastFlatValue: number = lastFlat.tone; 
        let flatz = u.enumToArray(Flats); 

        // Собираем все бемоли вплоть до "последнего", и следующего за ним
        let nextPassWillBeLast: boolean = false;
        for (let i=0; i < flatz.length; i++) {
            let currFlat = flatz[i];
            result.push(PitchSpace[Flats[currFlat]]);            
            if (nextPassWillBeLast) {
                break;
            }
            if (currFlat == lastFlatValue) {
                nextPassWillBeLast = true;
            }                
        }   
        
        return new AccidentalSet(result, SKey.FLAT);
    }

}

// МУСОР
// Дальше идут разные служебные функции, которые отвлекают читателя от основного алгоритма

// "Нормализация". Превращает тон звука в основной, а альтерацию вытесняет в поле accidental. 
// Эта неприятная функция нужна для угадывания параллельной тональности.
// Заметка на будущее: тут стоило бы ввести обработку октавы
function noteFromTone(tone: Tone, key: SKey): Note {
    // По-умолчанию считаем, что нота базовая и её никуда двигать не надо
    let newAccidental = Accidental.NATURAL;
    let newTone = tone;
    if (!tone.base) {
        if (key == SKey.FLAT) {
            // Тон нормализуем на полутон вверх, и компенсируем бемолем
            newTone = tone.next(); 
            newAccidental = Accidental.FLAT;
        } else  if (key == SKey.SHARP) {
            // Тон нормализуем на полутон вниз, и компенсируем диезом
            newTone = tone.prev();
            newAccidental = Accidental.SHARP;
        } else {
            // Вообще-то такого не бывает, эта строчка никогда не должна выполниться, но пусть будет дубль-диез
            newTone = tone.prev();
            newAccidental = Accidental.SHARP;
        }
    } else {
        // "В бемольной тональности си - это до бемоль"
        // Этот кейс необходим для всего одной несчастной тональности - ля-бемоль минор.
        // Без этого костыля параллельным считается си мажор, диезная тональность о пяти диезов
        // Совершенно не уверен, что это правильный ход!
        // Может быть стоило проверить обе альтернативы (си и до бемоль), 
        // показать что си мажор меняет ключ, и вот это уже хорошее обоснование для до бемоля.
        // Но пока не бахнет, сойдёт и так. Просто надо помнить, что это идеальное место чтобы бахнуло.
        if (tone.tone == PitchSpace.B && key == SKey.FLAT) {
            newTone = Tone.C;
            newAccidental = Accidental.FLAT;
        }

        // То же самое можно было бы сказать про фа в диезной тональности, 
        // Но ми диез мажор не существует (и минор тоже) среди практических тональностей.
        // А с теоретическими тональностями мы пока решили не связываться.
        // Очевидно, этот код будет добавляться.
    }
    let result = new Note(newTone, newAccidental);
    return result;    
}

// Код превращения ноты в тон - куда более прямой и понятный, чем наоборот
function toneFromNote(note: Note): Tone {
    let result: Tone = note.tone;
    if (note.accidental == Accidental.FLAT) {
        result = note.tone.prev();
    } else if (note.accidental == Accidental.SHARP) {
        result = note.tone.next(); 
    }
    return result;
}

// Функция для печати тонов
export namespace PitchSpace {
    export function strings(pitches: PitchSpace[]): string[] {
        const result:string[] = [];
        for (let pitch of pitches) {
            let stringValue =  PitchSpace[pitch];
            result.push(stringValue);
        }
        return result;
    }
}