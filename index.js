import PogObject from "../PogData"
import miintro from "./mi-core";
import { commands, syntax_color, SendChat } from "./utils/text";
import create_help_msg from "./utils/help";
import { profileCallFuncs, define } from "./core";

const profileHelpMsg = create_help_msg("profile");

export const profile = new PogObject("MI", {
    profile: "main"
},"appdata/.profile.json")

const openProfile = (profile) => {
    data = new PogObject("MI", {},`appdata/profile/${profile.profile === "main" ? "" : profile.profile}.data.json`)
    return data;
}
export let profileData = {data: openProfile(profile)};



export const setProfileCallFunc = (func) => {
    profileCallFuncs.push(func);
}

const _switch_profile = (name) => {
    if (name === undefined) {
        SendChat("&c引数が不足しています。/profile switch <name> の形式で入力してください。");
        return;
    }
    profile.profile = name;
    profile.save();
    profileData.data = openProfile(profile)
    for (let i = 0; i < profileCallFuncs.length; i++) {
        profileCallFuncs[i](profileData);
    }
    SendChat(`profileを${name}に変更しました。`);
}


const _list_profile = () => {
    const File = Java.type("java.io.File");
    const path = "./config/ChatTriggers/modules/MI/appdata/profile";
    const folder = new File(path);

    console.log(folder);

    if (!folder.exists() || !folder.isDirectory()) {
        SendChat("プロファイルフォルダが見つかりません。");
        return;
    }

    // Javaの配列を直接使う
    const profiles = [];
    const files = folder.listFiles();

    for (let i = 0; i < files.length; i++) {
        profiles.push(files[i].getName().split(".")[0]);
    }
    
    SendChat("プロファイル一覧");
    SendChat("===========================");
    // <profile>.data.jsonからプロファイル名を取得
    profiles.forEach(profile => {
        SendChat(`${profile === "" ? "main" : profile}`);
    });
}


if (define.length === 0) {
    console.log(miintro)
    register("command", (subcommand, arg1) => {
        if (subcommand === undefined) {
            SendChat(
`§csubcommandが選択されていません
==============================
${profileHelpMsg}`
            );
        }
        else if (subcommand === "switch") {
            _switch_profile(arg1);
        }
        else if (subcommand === "list") {
            _list_profile();
        }
        else{
            SendChat("&csubcommandが選択されていません");
        }
    }).setName(commands.profile.name);

    register("command", () => {
        SendChat(profileHelpMsg);
    }).setName(commands.help.name);

    define.push(1);
}