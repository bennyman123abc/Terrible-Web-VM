function compileLine(line) {
    line = line.split(" ");
    var c = line[0];
    
    switch(c) {
        case "ADD":
            var l = 3 + line[1].length;
            return `0x${l}00${line[1]}`; // length + 00 + number
        case "SUB":
            var l = 3 + line[1].length;
            return `0x${l}01${line[1]}`;
        case "MUL":
            var l = 3 + line[1].length;
            return `0x${l}02${line[1]}`;
        case "INC":
            return "0x303";
        case "DEC":
            return "0x304";
        default:
            console.log(`Warning: Undefined instruction "${c}"`);
    }
}