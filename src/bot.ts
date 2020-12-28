import Discord from 'discord.js'
import config from '../config.js'
import Readable from 'stream'
import { log, sqrt } from 'mathjs';

const client = new Discord.Client();

const meanSquare = (values: Int16Array): number => {
    // console.log(values)
    // const squareSum = values.reduce((acc, cur) => {
    //     return acc + (cur * cur)
    // })
    // // console.log(values.length)
    // return squareSum / values.length

    let sum = 0
    for(const value of values) {
        sum += (value * value)
    }
    return sum / values.length
}

// const concatTypedArrays = (a: any, b: any) => { // a, b TypedArray of same type
//     var c = new (a.constructor)(a.length + b.length);
//     c.set(a, 0);
//     c.set(b, a.length);
//     return c;
// }


// const concatBuffers = (a: any, b: any) => {
//     return concatTypedArrays(
//         new Uint8Array(a.buffer || a), 
//         new Uint8Array(b.buffer || b)
//     ).buffer;
// }

client.once('ready', () => {
    console.log("Ready!");
});

client.on('message', async message => {
    if (message.content !== "!normaliser") return;

    if (message?.member?.voice.channel) {
        const connection = await message.member.voice.channel.join();
        // const streams = []

        // for(const [memberID, member] of message.member.voice.channel.members) {
        //     streams.push(connection.receiver.createStream(member, {end: "manual"}))
        // }

        const stream = connection.receiver.createStream(message.author.id, {end: 'manual', mode: 'pcm'}) as Readable // Signed 16-bit PCM, 2 Channels (Stereo) 48000Hz
        console.log(stream);
        // (stream as any).resume()
        // let denominator = 0
        // let average = 0
        stream.on('data', (chunk: Buffer) => {
            
            // console.log(meanSquare(chunk))
            // average = ((average * denominator) + meanSquare(chunk)) / (denominator + chunk.length)
            // denominator = denominator + chunk.length
            // console.log(20 * log(sqrt(meanSquare(new Int16Array(chunk))), 10))
            // console.log(count)

            console.log(chunk)
            console.log(sqrt(meanSquare(new Int16Array(chunk))))
        })
    }
});

client.login(config.token)