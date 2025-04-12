use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello {}, I'm FRIDAY. How can I assist you today?", name)
}
