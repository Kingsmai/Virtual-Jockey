// Tauri 2.0 核心逻辑库
#[tauri::command]
fn open_stage_window(app: tauri::AppHandle) -> Result<(), String> {
    use tauri::Manager;
    
    // 1. 如果窗口已存在（例如配置中预载的 stage 窗口或已创建的窗口），直接显示并获得焦点
    if let Some(win) = app.get_webview_window("stage") {
        win.show().map_err(|e| e.to_string())?;
        win.unminimize().map_err(|e| e.to_string())?;
        win.set_focus().map_err(|e| e.to_string())?;
        return Ok(());
    }

    // 2. 如果窗口曾被用户手动关闭销毁，则动态重新构建
    let stage_window = tauri::WebviewWindowBuilder::new(
        &app,
        "stage",
        tauri::WebviewUrl::App("screen.html".into())
    )
    .title("STAGE DISPLAY - MODULAR PLUGIN ENGINE")
    .inner_size(1920.0, 1080.0)
    .min_inner_size(800.0, 600.0)
    .resizable(true)
    .fullscreen(false)
    .build()
    .map_err(|e| e.to_string())?;

    stage_window.show().map_err(|e| e.to_string())?;
    stage_window.set_focus().map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![open_stage_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
