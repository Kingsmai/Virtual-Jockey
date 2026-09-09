// Tauri 2.0 核心逻辑库
#[tauri::command]
fn open_stage_window(app: tauri::AppHandle) -> Result<(), String> {
    use tauri::Manager;
    
    // 如果窗口已存在则聚焦
    if let Some(win) = app.get_webview_window("stage") {
        win.set_focus().map_err(|e| e.to_string())?;
        return Ok(());
    }

    // 动态创建独立的舞台大屏渲染窗口
    let stage_window = tauri::WebviewWindowBuilder::new(
        &app,
        "stage",
        tauri::WebviewUrl::App("screen.html".into())
    )
    .title("STAGE DISPLAY - MODULAR PLUGIN ENGINE")
    .inner_size(1920.0, 1080.0)
    .min_inner_size(800.0, 600.0)
    .fullscreen(false)
    .build()
    .map_err(|e| e.to_string())?;

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
