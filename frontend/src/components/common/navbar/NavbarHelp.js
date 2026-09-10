function NavbarHelp({ onClose }) {
    return (
        <div className="navbar-help">
            <div className="navbar-help-header">
                <strong>How to Order</strong>

                <button
                    onClick={onClose}
                    className="navbar-help-close"
                >
                    ×
                </button>
            </div>

            <div className="navbar-help-content">
                <p><strong>1.</strong> Select your order type.</p>
                <p><strong>2.</strong> Enter your customer information.</p>
                <p><strong>3.</strong> Browse the menu and add your items.</p>
                <p><strong>4.</strong> Review your cart and proceed to checkout.</p>
                <p><strong>5.</strong> Choose your preferred payment method.</p>
            </div>
        </div>
    );
}

export default NavbarHelp;