import * as t from './Tonspace';

class ExpectedTons {
    public constructor(
        public tonality: t.Tonality,
        public accidentals: any
    ){}
}

let tons: ExpectedTons[] = [];
populateTons(tons);

let clean: boolean = true;

for (let i=0; i<tons.length; i++) {
    let ton: ExpectedTons = tons[i];
    let tonality = ton.tonality;
    let accidentals = tonality.accidentals();
    let result = accidentals ? accidentals.prettyJSON() : "UNDEFINED";
    if (JSON.stringify(result)!=JSON.stringify(ton.accidentals)) {
        clean = false;
        console.log("TONALITY CHECK FAILED");
        console.log("Tonality: %j", tonality);  
        console.log("Actual: %j", result);              
        console.log("Desired: %j", ton.accidentals);      
        console.log("==================================================");
    }
}

if (clean) {
    console.log("Everything clean!");
} else {
    console.log("Testing failed");
}

function populateTons(tons: ExpectedTons[]) {

    // Диезные мажорные тональности

    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.G, t.Accidental.NATURAL), t.SMode.MAJOR),    
        {"accidentals":["F"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.D, t.Accidental.NATURAL), t.SMode.MAJOR),    
        {"accidentals":["F","C"],"key":"SHARP"})
    );    
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.A, t.Accidental.NATURAL), t.SMode.MAJOR),    
        {"accidentals":["F","C","G"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.E, t.Accidental.NATURAL), t.SMode.MAJOR),    
        {"accidentals":["F","C","G","D"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.B, t.Accidental.NATURAL), t.SMode.MAJOR),    
        {"accidentals":["F","C","G","D","A"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.F, t.Accidental.SHARP), t.SMode.MAJOR),    
        {"accidentals":["F","C","G","D","A","E"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.C, t.Accidental.SHARP), t.SMode.MAJOR),    
        {"accidentals":["F","C","G","D","A","E","B"],"key":"SHARP"})
    );   

    // Бемольные мажорные тональности

    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.F, t.Accidental.NATURAL), t.SMode.MAJOR),    
        {"accidentals":["B"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.B, t.Accidental.FLAT), t.SMode.MAJOR),    
        {"accidentals":["B","E"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.E, t.Accidental.FLAT), t.SMode.MAJOR),    
        {"accidentals":["B","E","A"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.A, t.Accidental.FLAT), t.SMode.MAJOR),    
        {"accidentals":["B","E","A","D"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.D, t.Accidental.FLAT), t.SMode.MAJOR),    
        {"accidentals":["B","E","A","D","G"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.G, t.Accidental.FLAT), t.SMode.MAJOR),    
        {"accidentals":["B","E","A","D","G","C"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.C, t.Accidental.FLAT), t.SMode.MAJOR),    
        {"accidentals":["B","E","A","D","G","C","F"],"key":"FLAT"})
    );

    // Диезные минорные тональности

    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.E, t.Accidental.NATURAL), t.SMode.MINOR),    
        {"accidentals":["F"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.B, t.Accidental.NATURAL), t.SMode.MINOR),    
        {"accidentals":["F","C"],"key":"SHARP"})
    );    
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.F, t.Accidental.SHARP), t.SMode.MINOR),    
        {"accidentals":["F","C","G"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.C, t.Accidental.SHARP), t.SMode.MINOR),    
        {"accidentals":["F","C","G","D"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.G, t.Accidental.SHARP), t.SMode.MINOR),    
        {"accidentals":["F","C","G","D","A"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.D, t.Accidental.SHARP), t.SMode.MINOR),    
        {"accidentals":["F","C","G","D","A","E"],"key":"SHARP"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.A, t.Accidental.SHARP), t.SMode.MINOR),    
        {"accidentals":["F","C","G","D","A","E","B"],"key":"SHARP"})
    );

    // Бемольные минорные тональности

    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.D, t.Accidental.NATURAL), t.SMode.MINOR),    
        {"accidentals":["B"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.G, t.Accidental.NATURAL), t.SMode.MINOR),    
        {"accidentals":["B","E"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.C, t.Accidental.NATURAL), t.SMode.MINOR),    
        {"accidentals":["B","E","A"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.F, t.Accidental.NATURAL), t.SMode.MINOR),    
        {"accidentals":["B","E","A","D"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.B, t.Accidental.FLAT), t.SMode.MINOR),    
        {"accidentals":["B","E","A","D","G"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.E, t.Accidental.FLAT), t.SMode.MINOR),    
        {"accidentals":["B","E","A","D","G","C"],"key":"FLAT"})
    );
    tons.push(new ExpectedTons(
        new t.Tonality(new t.Note(t.Tone.A, t.Accidental.FLAT), t.SMode.MINOR),    
        {"accidentals":["B","E","A","D","G","C","F"],"key":"FLAT"})
    );
}