'use client'

import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import styles from "./SyntaxHighlighter.module.css";

const SyntaxHighlighter = ({ content }) => {
    
    useEffect(() => {
        // Process each pre element
        document.querySelectorAll('pre').forEach((block) => {
        // Avoid double wrapping
            if (!block.parentNode.classList.contains(styles.preContainer)) {
                const codeElement = block.querySelector('code');
                if (codeElement) {
                hljs.highlightBlock(codeElement);
                } else {
                // No code tag, just highlight the text in pre
                hljs.highlightBlock(block);
                }

                // Create container div for each pre block
                const preContainer = document.createElement('div');
                preContainer.className = styles.preContainer;

                // Wrap pre element with the container div
                block.parentNode.insertBefore(preContainer, block);
                preContainer.appendChild(block);

                // Add language label
                const language = block.className.split('language-')[1] || 'plaintext';
                const languageLabel = document.createElement('div');
                languageLabel.className = styles.codeLangLabel;
                languageLabel.textContent = language.toUpperCase();
                preContainer.appendChild(languageLabel);

                // Add copy button
                const copyButton = document.createElement('button');
                copyButton.className = styles.copyButton;
                copyButton.textContent = 'Copy';
                preContainer.appendChild(copyButton);

                // Copy to clipboard functionality
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(block.textContent);
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                });
            }
        });
    }, [content]);

    return <div>{content}</div>;
};

export default SyntaxHighlighter;
