const meta = {
    name : "mi",
}

export const commands = {
    base: {
        name: "mi",
        help: []
    },
    profile: {
        name: "mi-profile",
        help: []
    },
    help: {
        name: "mi-help",
        help: []
    }
};

export const syntax_color = {
    "cmd": "§3",
    "sub": "§b",
    "arg": "§9"
}

// commands.loc.help を後から定義
commands.profile.help = [
    {
        syntax: `/${commands.profile.name} switch <name>`,
        description: "§a現在のプロファイルを切り替えます。存在しない場合作成します。§r"
    }
];


export const SendChat = (msg) => {
    ChatLib.chat(`&6[&e${meta.name}&r&6]&r ${msg}`);
}