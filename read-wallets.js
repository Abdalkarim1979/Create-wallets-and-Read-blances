document.getElementById('readFile').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const network = document.getElementById('networkSelect').value;

    const networkUrls = {
        mainnet: 'wss://ethereum-rpc.publicnode.com',
        holesky: 'https://ethereum-holesky-rpc.publicnode.com',
        
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const content = e.target.result;
            const lines = content.split('\n');
            const addresses = lines.filter(line => line.includes('Address')).map(line => line.split(': ')[1]);
            const web3 = new Web3(networkUrls[network]);
            let totalBalance = 0;
            let walletInfo = '';
            const progressBar = document.getElementById('progressBar');
            const totalAddresses = addresses.length;

            for (let i = 0; i < totalAddresses; i++) {
                const address = addresses[i];
                const balance = await web3.eth.getBalance(address);
                const ethBalance = web3.utils.fromWei(balance, 'ether');
                totalBalance += parseFloat(ethBalance);
                walletInfo += `Address: ${address}\nBalance: ${ethBalance} ETH\n\n`;

                // Update progress bar
                const progress = ((i + 1) / totalAddresses) * 100;
                progressBar.style.width = `${progress}%`;
                progressBar.innerText = `${Math.round(progress)}%`;
            }

            document.getElementById('walletInfo').innerText = walletInfo;
            document.getElementById('totalBalance').innerText = `Total Balance: ${totalBalance} ETH`;
            document.getElementById('walletCount').innerText = `Total Wallets: ${totalAddresses}`;
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file to read.');
    }
});
