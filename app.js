document.getElementById('createWallets').addEventListener('click', () => {
    const walletCount = parseInt(document.getElementById('walletCount').value);
    const showPrivateKeys = document.getElementById('showPrivateKeys').checked;
    const web3 = new Web3();
    let walletInfo = '';
    let fileContent = '';

    for (let i = 0; i < walletCount; i++) {
        const account = web3.eth.accounts.create();
        walletInfo += `Wallet ${i + 1} Address: ${account.address}\n`;
        fileContent += `Wallet ${i + 1} Address: ${account.address}\n`;
        if (showPrivateKeys) {
            walletInfo += `Wallet ${i + 1} Private Key: ${account.privateKey}\n`;
        }
        fileContent += `Wallet ${i + 1} Private Key: ${account.privateKey}\n`;
    }

    document.getElementById('walletInfo').innerText = walletInfo;

    // Create a blob with the file content
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Show the download link and set its href attribute
    const downloadLink = document.getElementById('downloadWallets');
    downloadLink.style.display = 'inline';
    downloadLink.href = url;
    downloadLink.download = 'wallets.txt';
    downloadLink.textContent = 'Download Wallets Info';
});

document.getElementById('downloadWallets').addEventListener('click', () => {
    // Clean up the URL object after download
    setTimeout(() => {
        URL.revokeObjectURL(document.getElementById('downloadWallets').href);
    }, 100);
});
