import { commands, syntax_color } from "./text";

const create_help_msg = ((item) => {
    // commands.loc.help は配列なので、forEach を使って処理
    let helpMessage = ""; // 結果を格納する文字列

    // 配列に対して forEach を使う
    commands[item].help.forEach((value) => {
        // cmd, sub, args を取り出し、syntax を再構成
        const cmd = value.syntax.split(" ")[0];
        const sub = value.syntax.split(" ")[1] || ""; // サブコマンドを取り出す（存在すれば）
        const args = value.syntax.split(" ").slice(2).join(" ") || ""; // 引数を取り出す（存在すれば）

        // 新しい構造に基づいて新しい syntax を作成
        const newSyntax = `${syntax_color.cmd}${cmd} ${syntax_color.sub}${sub} ${syntax_color.arg}${args}`;


        // coloredSyntax に色をつけて表示する
        helpMessage += `${newSyntax}\n${value.description}\n`;
    });

    return helpMessage; // 最終的な文字列を返す
})

export default create_help_msg;