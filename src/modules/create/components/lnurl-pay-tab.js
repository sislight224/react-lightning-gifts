// NPM Dependencies
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import bech32 from 'bech32';

// Util Dependencies
import Emoji from 'utils/components/emoji';
import InputCopyButton from 'utils/components/input-copy-button';

// Local Dependencies
import { SERVER_URL } from 'utils/constants';
import { Button, Icon } from 'antd';

class LnurlPayTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLnurlHelp: false
        };
    }

    render() {
        const { showLnurlHelp } = this.state;

        const lnurlpay = bech32.encode('lnurl',
            bech32.toWords(Buffer.from(`${SERVER_URL}/lnurl`)),
            1500
        );

        return (
            <>
                <p>
                    Scan the QR code to create a gift from your wallet&nbsp;
                    <Emoji label="confeti" symbol="👇" />
                </p>
                <a href={`lightning:${lnurlpay}`}>
                    <QRCode
                        value={lnurlpay}
                        size={128}
                        style={{ marginBottom: 4 }}
                        renderAs="svg"
                    />
                </a>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => this.setState({ showLnurlHelp: !showLnurlHelp })}
                    >
                        <small>
                            Which Lightning wallets are compatible?&nbsp;
                            {showLnurlHelp ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
                        </small>
                    </Button>
                    {showLnurlHelp && (
                        <div style={{ marginTop: 6 }}>
                            <small>
                                <div style={{ marginBottom: 6 }}><a rel="noopener noreferrer" target="_blank" href="https://lightning-wallet.com/">Bitcoin Lightning Wallet</a> (Android)</div>
                                <div style={{ marginBottom: 6 }}><a rel="noopener noreferrer" target="_blank" href="https://zeusln.app/">Zeus Wallet</a> (iOS & Android)</div>
                            </small>
                        </div>
                    )}
                </div>
                <InputCopyButton text={lnurlpay} />
            </>
        );
    }
}

export default LnurlPayTab;
