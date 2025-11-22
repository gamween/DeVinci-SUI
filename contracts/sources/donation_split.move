// Voici le fichier donation.move
module creator_seal::donation_split {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::coin::Coin;
    use sui::sui::SUI;
    use sui::event;
    use sui::tx_context::TxContext;

    public struct DonationSplitEvent has copy, drop, store {
        donor: address,
        streamer: address,
        dev: address,
        amount: u64,
        split_ratio: u64, // ex: 2000 = 20% sur 10000
    }

    public struct SupporterNFT has key, store {
        id: UID,
        owner: address,
        streamer: address,
        amount: u64,
    }

    public entry fun donate_and_split(
        streamer: address,
        dev: address,
        split_ratio: u64,
        donation_coin: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let total = coin::value(&donation_coin);
        let amt_dev = total * split_ratio / 10_000;
        let amt_streamer = total - amt_dev;

        let dev_coin = coin::split(&mut donation_coin, amt_dev);
        let streamer_coin = donation_coin;

        transfer::public_transfer(dev_coin, dev);
        transfer::public_transfer(streamer_coin, streamer);

        event::emit(DonationSplitEvent {
            donor: tx_context::sender(ctx),
            streamer,
            dev,
            amount: total,
            split_ratio,
        });

        let nft = SupporterNFT {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            streamer,
            amount: total,
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }
}
