'use client';

import React from 'react';
import styles from './SizeChart.module.css';

interface SizeChartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SizeChart({ isOpen, onClose }: SizeChartProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    &times;
                </button>

                <div>
                    <h3 className={styles.title}>Size Guide</h3>
                    <p className={styles.subtitle}>Find your perfect fit with our US size conversion.</p>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>Size</th>
                                    <th className={styles.th}>US Size</th>
                                    <th className={styles.th}>Bust (in)</th>
                                    <th className={styles.th}>Waist (in)</th>
                                    <th className={styles.th}>Hips (in)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>XL</td>
                                    <td className={styles.td}>12</td>
                                    <td className={styles.td}>40 - 42</td>
                                    <td className={styles.td}>33 - 35</td>
                                    <td className={styles.td}>42 - 44</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>2XL</td>
                                    <td className={styles.td}>14 - 16</td>
                                    <td className={styles.td}>42 - 46</td>
                                    <td className={styles.td}>35 - 39</td>
                                    <td className={styles.td}>44 - 48</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>3XL</td>
                                    <td className={styles.td}>18 - 20</td>
                                    <td className={styles.td}>46 - 50</td>
                                    <td className={styles.td}>39 - 43</td>
                                    <td className={styles.td}>48 - 52</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>4XL</td>
                                    <td className={styles.td}>22 - 24</td>
                                    <td className={styles.td}>50 - 54</td>
                                    <td className={styles.td}>43 - 47</td>
                                    <td className={styles.td}>52 - 56</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>5XL</td>
                                    <td className={styles.td}>26 - 28</td>
                                    <td className={styles.td}>54 - 58</td>
                                    <td className={styles.td}>47 - 51</td>
                                    <td className={styles.td}>56 - 60</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={onClose}
                        className={styles.actionButton}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
