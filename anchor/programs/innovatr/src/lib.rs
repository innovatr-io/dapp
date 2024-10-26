#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod innovatr {
    use super::*;

  pub fn close(_ctx: Context<CloseInnovatr>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.innovatr.count = ctx.accounts.innovatr.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.innovatr.count = ctx.accounts.innovatr.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeInnovatr>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.innovatr.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeInnovatr<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Innovatr::INIT_SPACE,
  payer = payer
  )]
  pub innovatr: Account<'info, Innovatr>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseInnovatr<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub innovatr: Account<'info, Innovatr>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub innovatr: Account<'info, Innovatr>,
}

#[account]
#[derive(InitSpace)]
pub struct Innovatr {
  count: u8,
}
