
import React, { useState, useCallback } from 'react';
import { UnsupportedChainIdError } from '@web3-react/core'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from 'notistack';

import DialogWrapper, { dialogStyles } from 'hoc/DialogWrapper';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';
import Image from 'components/UI/Image';
import { isEmpty, delay } from 'utils/utility';
import { nftInstance } from 'services/nftInstance';

const { create } = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


const useStyles = makeStyles(theme => ({
  actionButton: {
    backgroundColor: theme.custom.palette.darkRed,
    minWidth: theme.spacing(1),
    border: 'none'
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    marginRight: -theme.spacing(2 / 8)
  },
  titleLine: {
    marginBottom: theme.spacing(2.5)
  },
  labelLine: {
    marginBottom: theme.spacing(0)
  },
  input: {
    display: 'none'
  },
  imagePad: {
    width:200, 
    height: 200, 
    background: 'none', 
    margin: '10px',
    borderRadius: '5px',
    border: '1px solid rgb(107,118,161)'
  },
  fileDropZone: {
    height: 96,
    minHeight: 'unset'
  },
  dialogContent: {
    [theme.breakpoints.down(360)]: {
      maxHeight: '200px',
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '382px',
      padding: theme.spacing(1, 0, 1, .5),
    },
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    maxHeight: '460px',
    width: 'auto',
    overflowX: 'unset',
    overflowY: 'scroll',
    '&::-webkit-scrollbar-track': {
      borderRadius: 2,
      backgroundColor: theme.palette.background.default
    },
    '&::-webkit-scrollbar': {
      width: 5,
      backgroundColor: theme.palette.background.default
    },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    display: 'flex',
    padding: `2px 8px 8px 8px`,
    margin: 0,
    flexGrow: 1,
  },
}));

const WalletModal = ({ open, onClose, headerTitle, activatingConnector, setActivatingConnector, triedEager, context }) => {
  const classes = useStyles();
  const dialogClasses = dialogStyles();
  const { enqueueSnackbar } = useSnackbar();

  const getErrorMessage = (error) => {
    if (error instanceof NoEthereumProviderError) {
      return `No browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`
    } else if (error instanceof UnsupportedChainIdError || !error) {
      return "You're connected to an unsupported network. Please change network as Ethereum"
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect ||
      error instanceof UserRejectedRequestErrorFrame
    ) {
      return 'Please authorize this website to access your Ethereum account.'
    } else {
      console.error(error)
      return 'An unknown error occurred. Check the console for more details.'
    }
  }

  const { account, chainId, library, error } = context
  const nft = nftInstance(account, chainId, library);
  
  const metaMaskInstallHandler = () => {
    window.open('https://metamask.io/download', '_blank');
  }

  const onFormSubmit = async (ev) => {
    ev.preventDefault()
    onClose();
  }

  const [state, setState] = useState({
    nftname: '',
    description: ''
    // amount: 0
  });

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [imgSrc, setImageSrc] = useState('');  //image src
  const [imgHash, setImageHash] = useState(''); //uploaded image's hash on ipfs
  const [preImageHash, setPreImageHash] = useState(''); //pre ulopaded image's hash

  const inputChangeHandler = useCallback(event => {
    const { name, value } = event.target;
    if (name === 'nftName') {
        setState(prevState => ({
            ...prevState, [name]: value, 'nftname': value
        }));
    } else if(name === 'nftDescription'){
        setState(prevState => ({
            ...prevState, [name]: value, 'description': value
        }));
    }
    // } else {
    //   setState(prevState => ({
    //     ...prevState, [name]: value, 'amount': value
    //   }));
    // }
  }, []);

  const readImage = useCallback(event => {
    setLoadingStatus(true);
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      ipfs.add(Buffer(reader.result)).then(result => {
        setImageHash(result.path)
        setImageSrc("https://ipfs.io/ipfs/" + result.path)
        setLoadingStatus(false);
        enqueueSnackbar(`Image Upload success`, { variant: 'success' });
      }).catch(err => {
        enqueueSnackbar(`Image Upload error`, { variant: 'error' });
        console.log("err", err)
        setLoadingStatus(false);
      })
    }
  }, []);

  const inputEl = React.useRef(null);
  const onButtonClick = () => {
    if(!!error || isEmpty(account))
    {
      enqueueSnackbar(`First, Please fix the error`, { variant: 'error' });
      return;
    }
    // `current` points to the mounted file input element
    inputEl.current.click();
  };

  const mint = async () => {
    if(!!error || isEmpty(account))
    {
      enqueueSnackbar(`First, Please fix the error`, { variant: 'error' });
      return;
    }
    setLoadingStatus(true);
    let jsonName = state.nftname
    let jsonDescription = state.description
    let jsonHash = imgHash
    
    if(jsonName === '')
    {
      enqueueSnackbar(`Please input name and amount`, { variant: 'error' });
      setLoadingStatus(false)
      return
    } else if(jsonHash === '') {
      enqueueSnackbar(`First, Please upload image.`, { variant: 'error' });
      setLoadingStatus(false)
      return
    } else if(preImageHash === jsonHash) {
      enqueueSnackbar(`Minted already.`, { variant: 'error' });
      setLoadingStatus(false)
      return
    }

    ipfs.add(JSON.stringify({
      'name':jsonName,
      'description':jsonDescription,
      'image': jsonHash
    })).then(async (result) => {
      setPreImageHash(jsonHash);
      try{
        let loop = true
        let tx = null
        const totalSupply = await nft.totalSupply()
        const saleIsActive = await nft.saleIsActive()
        let tokenId = parseInt(totalSupply)
        let overrides = {
          value: `${0.00001*1e18}`,
          gasLimit: 620000
        }

        if(!saleIsActive)
        {
          const { hash: flipSaleStateHash } = await nft.flipSaleState()
          while (loop) {
              tx = await library.getTransactionReceipt(flipSaleStateHash)
              if(isEmpty(tx)) {
                await delay(200)
              } else {
                  const { hash: mintDogHash } = await nft.mintDog(1,overrides)
                  while(loop) {
                    tx = await library.getTransactionReceipt(mintDogHash)
                    if(isEmpty(tx)) {
                        await delay(300)
                    } else {
                      const { hash: setTokenURIHash } = await nft.setTokenURI(tokenId, `${result.path}`) 
                      while(loop) {
                        tx = await library.getTransactionReceipt(setTokenURIHash)
                        if(isEmpty(tx)) {
                          await delay(300)
                        } else {
                          loop = false
                        }
                      }
                    } 
                  }
              }
          }
        } else {
          const { hash: mintDogHash } = await nft.mintDog(1,overrides)
          while (loop) {
              tx = await library.getTransactionReceipt(mintDogHash)
              if(isEmpty(tx)) {
                  await delay(300)
              } else {
                const { hash: setTokenURIHash } = await nft.setTokenURI(tokenId, `${result.path}`) 
                while(loop) {
                  tx = await library.getTransactionReceipt(setTokenURIHash)
                  if(isEmpty(tx)) {
                    await delay(300)
                  } else {
                    loop = false
                  }
                }
              } 
          }
        }
        if (tx.status === 1) {
             setLoadingStatus(false)
             enqueueSnackbar(`Minted successfully.`, { variant: 'success' });
             return;
        }
      }
      catch(error) {
          console.log('kevin===>', error)
          enqueueSnackbar(`Mint error ${error?.data?.message}`, { variant: 'error' });
          setLoadingStatus(false)
      }
    }).catch(err => {
      enqueueSnackbar(`Upload Json error`, { variant: 'error' });
      setLoadingStatus(false)
    })
  }
  
  return (
    <DialogWrapper open={open} onClose={onClose}>
      <form onSubmit={onFormSubmit} >
        <div className={dialogClasses.root}>
          <Typography variant='h6' className={classes.titleLine}>{headerTitle}</Typography>
          <DialogContent dividers className={classes.dialogContent}>
            <Grid container spacing={2} className={classes.container} justify="space-between">
            <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                    xs={12}
                    md={6}
                    spacing={2}>
                    <div className={classes.imagePad}>
                      <Image
                          src={imgSrc}
                          style={{width: '200px', height: '200px'}}
                          alt="Web3 Legal Engineering"
                          data-aos="fade-left"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000"
                      />
                    </div>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="outlined-button-file"
                      multiple
                      type="file"
                      ref={inputEl}
                      onChange={readImage}
                    />
                    <label htmlFor="outlined-button-file">
                      <Button
                        onClick={()=>onButtonClick()}
                      >Choose File</Button>
                    </label>                   
                </Grid>
                <Grid
                    item
                    container
                    justify="flex-start"
                    alignItems="flex-start"
                    xs={12}
                    md={6}
                    spacing={0}>
                    <Typography variant='subtitle1' className={classes.labelLine}>Name</Typography>
                    <MemoizedOutlinedTextField
                      placeholder='ex: dog'
                      type="string"
                      name={'nftName'}
                      value={state.nftname}
                      onChange={inputChangeHandler}
                    />
                    <Typography variant='subtitle1' className={classes.labelLine}>Description</Typography>
                    <MemoizedOutlinedTextField
                      placeholder='ex: dog is very pretty'
                      type="string"
                      name={'nftDescription'}
                      value={state.description}
                      onChange={inputChangeHandler}
                    />
                    {/* <Typography variant='subtitle1' className={classes.labelLine}>Amount</Typography>
                    <MemoizedOutlinedTextField
                      placeholder='0'
                      type="number"
                      name={'nftAmount'}
                      value={state.amount}
                      onChange={inputChangeHandler}
                    /> */}
                </Grid>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {(error instanceof NoEthereumProviderError) && (
                  <ContainedButton
                    style={{
                      height: '3rem',
                      marginTop: '2rem',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                    }}
                    variant="outlined"
                    onClick={() => metaMaskInstallHandler()}
                  >
                    Install Metamask
                  </ContainedButton>
                )}
                {(!!error || isEmpty(account))&& <h4 style={{ marginTop: '1rem', marginBottom: '0', color: '#16ACE2' }}>{getErrorMessage(error)}</h4>}
              </div>
            </Grid>
          </DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ContainedButton
              loading={loadingStatus}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '2.5rem',
                marginTop: '1rem',
                borderRadius: '1rem',
                borderColor: 'red',
                cursor: 'pointer',
                color: 'textSecondary'
              }}
              onClick={() => 
                mint()
              }
            >
              Mint Token
            </ContainedButton>
          </div>
        </div>
      </form>
    </DialogWrapper>
  );
}

export default WalletModal;
