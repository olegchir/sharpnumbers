import * as t from './Tonspace';

// Код запуска

class Main {
    public main(query: any): any {
        let tonality = new t.Tonality(new t.Note(t.Tone.A, t.Accidental.FLAT), t.SMode.MINOR);
        let accidentals = tonality.accidentals();
        return {    
            // result: this.note(),              
            result: accidentals ? accidentals.prettyJSON() : "UNDEFINED",
            tonality: tonality
        };
    }
}

export default new Main()
