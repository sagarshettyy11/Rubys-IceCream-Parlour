import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, ShoppingCart } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('pickup');
  const [notes, setNotes] = useState('');

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Structured Text compilation
    let message = `*🍦 NEW ICE CREAM ORDER FROM RUBY'S 🍦*\n\n`;
    message += `*Customer Details:*\n`;
    message += `• *Name:* ${customerName || 'Anonymous'}\n`;
    message += `• *Type:* ${orderType === 'pickup' ? 'Store Pickup' : orderType === 'dinein' ? 'Table Dine-in' : 'Delivery'}\n`;
    if (notes) {
      message += `• *Notes:* ${notes}\n`;
    }
    message += `\n*Order Summary:*\n`;

    cartItems.forEach((item) => {
      message += `• ${item.quantity}x _${item.name}_ (Rs. ${item.price} each) → *Rs. ${item.price * item.quantity}*\n`;
    });

    message += `\n*Total Bill: Rs. ${totalPrice}*`;
    message += `\n\n_Thank you for ordering with Ruby's!_`;

    const encodedMessage = encodeURIComponent(message);
    // Parlour official WhatsApp number (+91 99999 99999)
    window.open(`https://wa.me/919999999999?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      {/* Backdrop Backdrop Overlay blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(31, 21, 17, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 1
        }}
      />

      {/* Main Drawer Slide In panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'var(--bg-secondary)',
          boxShadow: '-10px 0 30px rgba(62, 39, 35, 0.1)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--border-color)'
        }}
      >
        {/* Drawer Header */}
        <div 
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} style={{ color: 'var(--color-chocolate)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Your Scoop Cart</h3>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-chocolate)',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Items list */}
        <div 
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
          className="cart-items-container"
        >
          {cartItems.length === 0 ? (
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '12px',
                textAlign: 'center',
                color: 'var(--color-caramel)'
              }}
            >
              <ShoppingCart size={48} style={{ opacity: 0.3 }} />
              <h4>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem' }}>Add some premium ice creams or special sundaes to get started!</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      background: 'var(--bg-primary)',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-caramel)' }}>Rs. {item.price}</p>
                      
                      {/* Quantity Selectors */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#D32F2F',
                        cursor: 'pointer',
                        padding: '6px'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Customer Details Form */}
              <form 
                onSubmit={handleCheckout}
                style={{
                  marginTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-chocolate)' }}>Delivery Details</h4>
                
                {/* Input Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-caramel)' }}>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: 'var(--color-chocolate)'
                    }}
                  />
                </div>

                {/* Input Order Type Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-caramel)' }}>Order Type</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label 
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '8px',
                        border: `1px solid ${orderType === 'pickup' ? 'var(--color-chocolate)' : 'var(--border-color)'}`,
                        background: orderType === 'pickup' ? 'var(--color-accent-pastel)' : 'transparent',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="orderType" 
                        value="pickup" 
                        checked={orderType === 'pickup'} 
                        onChange={() => setOrderType('pickup')}
                        style={{ display: 'none' }}
                      />
                      Pickup
                    </label>

                    <label 
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '8px',
                        border: `1px solid ${orderType === 'dinein' ? 'var(--color-chocolate)' : 'var(--border-color)'}`,
                        background: orderType === 'dinein' ? 'var(--color-accent-pastel)' : 'transparent',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="orderType" 
                        value="dinein" 
                        checked={orderType === 'dinein'} 
                        onChange={() => setOrderType('dinein')}
                        style={{ display: 'none' }}
                      />
                      Dine-in
                    </label>

                    <label 
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '8px',
                        border: `1px solid ${orderType === 'delivery' ? 'var(--color-chocolate)' : 'var(--border-color)'}`,
                        background: orderType === 'delivery' ? 'var(--color-accent-pastel)' : 'transparent',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="orderType" 
                        value="delivery" 
                        checked={orderType === 'delivery'} 
                        onChange={() => setOrderType('delivery')}
                        style={{ display: 'none' }}
                      />
                      Delivery
                    </label>
                  </div>
                </div>

                {/* Optional Notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-caramel)' }}>Special Instructions</label>
                  <textarea 
                    placeholder="Extra nuts, less sweet, table number etc." 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none',
                      color: 'var(--color-chocolate)'
                    }}
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer Checkout panel */}
        {cartItems.length > 0 && (
          <div 
            style={{
              padding: '24px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-primary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-caramel)' }}>Subtotal:</span>
              <span style={{ fontFamily: 'var(--font-headings)', fontWeight: '800', fontSize: '1.4rem' }}>Rs. {totalPrice}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <Send size={18} />
              Send Order via WhatsApp
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
