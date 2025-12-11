/**
 * LEHRERZITATE - Component Loader
 * Dynamically loads external HTML components (header and footer)
 */

async function loadComponent(componentName) {
    try {
        const response = await fetch(`${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}.html`);
        }
        const html = await response.text();
        
        if (componentName === 'header') {
            // Header goes at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', html);
        } else if (componentName === 'footer') {
            // Footer goes at the end of body
            document.body.insertAdjacentHTML('beforeend', html);
        }
        
        console.log(`✓ Loaded ${componentName} component`);
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
}

async function loadAllComponents() {
    // Load header first
    await loadComponent('header');
    
    // Then load footer
    await loadComponent('footer');
    
    // Dispatch custom event to notify app.js that components are loaded
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadAllComponents);