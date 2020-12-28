var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Discord from 'discord.js';
import config from '../config.js';
import { sqrt } from 'mathjs';
const client = new Discord.Client();
const meanSquare = (values) => {
    let sum = 0;
    for (const value of values) {
        sum += (value * value);
    }
    return sum / values.length;
};
client.once('ready', () => {
    console.log("Ready!");
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (message.content !== "!normaliser")
        return;
    if ((_a = message === null || message === void 0 ? void 0 : message.member) === null || _a === void 0 ? void 0 : _a.voice.channel) {
        const connection = yield message.member.voice.channel.join();
        const stream = connection.receiver.createStream(message.author.id, { end: 'manual', mode: 'pcm' });
        console.log(stream);
        stream.on('data', (chunk) => {
            console.log(chunk);
            console.log(sqrt(meanSquare(new Int16Array(chunk))));
        });
    }
}));
client.login(config.token);
