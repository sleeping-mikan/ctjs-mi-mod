import PogObject from "../PogData"
import miintro from "./mi-core";
import { commands, syntax_color, SendChat } from "./utils/text";
import create_help_msg from "./utils/help";
import { profileCallFuncs, define } from "./core";

const profileHelpMsg = create_help_msg("profile");

console.log(miintro)
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


if (define.length === 0) {
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
        else{
            SendChat("&csubcommandが選択されていません");
        }
    }).setName(commands.profile.name);

    register("command", () => {
        SendChat(profileHelpMsg);
    }).setName(commands.help.name);

    register("command", () => {
        SendChat(profileHelpMsg);
    }).setName(commands.base.name);
    define.push(1);
}