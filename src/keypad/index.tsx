import { useEffect, useState } from 'react';
import classes from './keypad.module.css';

const charset = "АБВГДЕЁЖЗИЙКЛИНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя ";

export function Keypad() {
    const [k, setk] = useState('');
    useEffect(() => {
        const listenkeys = (e: KeyboardEvent) => {
            if (e.key === 'Backspace') {
                if (k.length === 0) return;
                setk(k.slice(0, k.length - 1));
                return;
            }
            if (!charset.includes(e.key)) return;
            if (e.key === ' ') {
                e.preventDefault();
                setk(k + ' ');
                return;
            }
            setk(k + e.key)
        }
        window.addEventListener('keydown', listenkeys) 
        return () => window.removeEventListener('keydown', listenkeys)
    }, [k])
    if (k === '') return null
    return <section className={classes.keypadplacement}>{k}</section>
}