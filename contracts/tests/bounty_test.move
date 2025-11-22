module creator_seal::bounty_test {
    use sui::coin;
    use sui::sui::SUI;
    use creator_seal::bounty;
    use sui::tx_context::TxContext;

    #[test_only]
    public fun test_bounty_lifecycle(ctx: &mut TxContext) {
        let dev = @0x42;
        let streamer = @0x4242;
        let reward_coin = coin::zero<SUI>(ctx);
        let mut bounty = bounty::create_bounty(dev, streamer, reward_coin, ctx);

        bounty::accept_bounty(&mut bounty, streamer, ctx);
        bounty::complete_bounty(&mut bounty, dev, &mut reward_coin, streamer, ctx);
    }
}
