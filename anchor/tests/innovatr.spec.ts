import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Innovatr} from '../target/types/innovatr'

describe('innovatr', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Innovatr as Program<Innovatr>

  const innovatrKeypair = Keypair.generate()

  it('Initialize Innovatr', async () => {
    await program.methods
      .initialize()
      .accounts({
        innovatr: innovatrKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([innovatrKeypair])
      .rpc()

    const currentCount = await program.account.innovatr.fetch(innovatrKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Innovatr', async () => {
    await program.methods.increment().accounts({ innovatr: innovatrKeypair.publicKey }).rpc()

    const currentCount = await program.account.innovatr.fetch(innovatrKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Innovatr Again', async () => {
    await program.methods.increment().accounts({ innovatr: innovatrKeypair.publicKey }).rpc()

    const currentCount = await program.account.innovatr.fetch(innovatrKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Innovatr', async () => {
    await program.methods.decrement().accounts({ innovatr: innovatrKeypair.publicKey }).rpc()

    const currentCount = await program.account.innovatr.fetch(innovatrKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set innovatr value', async () => {
    await program.methods.set(42).accounts({ innovatr: innovatrKeypair.publicKey }).rpc()

    const currentCount = await program.account.innovatr.fetch(innovatrKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the innovatr account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        innovatr: innovatrKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.innovatr.fetchNullable(innovatrKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
