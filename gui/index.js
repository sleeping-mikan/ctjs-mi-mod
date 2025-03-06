// import { getGUIInstance, MikanButton, MikanPanel, MikanSwitch, MikanText } from "../../MiGui"
import { SettingUI } from "../../MiGui/SettingUI";
import { config } from "../utils/config";
import { getMikanHUD } from "../../MiGui/ObjectMove";
import includeGuard from "./ifdef";
import { commands } from "../utils/text";


let gui,hud;

if (includeGuard.length === 0){
    if (!config.Mi) config.Mi = {};
    if (!config.Mi.Test) config.Mi.Test = {};
    if (config.Mi.Test.enabled === undefined) config.Mi.Test.enabled = false;
    config.save();
    includeGuard.push(new SettingUI());
    includeGuard.push(getMikanHUD({
        bgColor: Renderer.color(0, 0, 0, 0),
    }));
    gui = includeGuard[0];
    hud = includeGuard[1];
    const initSettingUI = () => {
        gui.setTitle("Mi v1.2.0 Settings", {color:"§6"});

        gui.appendCategory("Mi", {color:"§6", bgColor:Renderer.color(0, 0, 0, 0.5)});

        // gui.appendItemWithButton("Mi", "Jacob contest tracker", "toggle", () => {
        //     ChatLib.chat("click it")
        // })
        gui.appendItemWithSwitch("Mi", "Test", config.Mi.Test.enabled, (isOn) => {
            ChatLib.chat("click it " + `${isOn}`)
            config.Mi.Test.enabled = isOn;
            config.save();
        })


        gui.setSelectCategoryStyle({color:"§1", bgColor:Renderer.color(0, 0, 0, 0.5)});
    }

    initSettingUI();

    register("command", () => {
        gui.openGui()

    }).setName(commands.base.name);

    register("tick", () => {
        if (!hud.isOpenGui()){
            hud.setMode(null);
        }
    })

    

    gui.appendItemWithButton("Mi", "Hud Items Move", "move", (isOn) => {
        gui.closeGui();
        // 画面ロック
        hud.setMode("moving");
        hud.openGui();
    });

}

gui = includeGuard[0];
hud = includeGuard[1];

export {gui, hud};
