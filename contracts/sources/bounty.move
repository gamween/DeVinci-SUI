// Voici le fichier bounty.move
module creator_seal::bounty {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::coin::Coin;
    use sui::sui::SUI;
    use sui::event;
    use sui::tx_context::TxContext;

    public struct Bounty has key, store {
        id: UID,
        dev: address,
        streamer: address,
        reward: u64,
        state: u8, // 0: created, 1: accepted, 2: completed
    }

    public struct BountyAcceptedEvent has copy, drop, store {
        bounty_id: object::ID,
        streamer: address,
    }

    public struct BountyCompletedEvent has copy, drop, store {
        bounty_id: object::ID,
        dev: address,
        streamer: address,
    }

    public entry fun create_bounty(
        dev: address,
        streamer: address,
        reward: Coin<SUI>,
        ctx: &mut TxContext
    ): Bounty {
        let id = object::new(ctx);
        let amount = coin::value(&reward);
        Bounty { id, dev, streamer, reward: amount, state: 0 }
    }

    public entry fun accept_bounty(
        bounty: &mut Bounty,
        streamer: address,
        ctx: &mut TxContext
    ) {
        assert!(bounty.streamer == streamer, 1);
        bounty.state = 1;
        event::emit(BountyAcceptedEvent {
            bounty_id: object::id(&bounty.id),
            streamer
        });
    }

    public entry fun complete_bounty(
        bounty: &mut Bounty,
        dev: address,
        coin_vault: &mut Coin<SUI>,
        streamer: address,
        ctx: &mut TxContext
    ) {
        assert!(bounty.state == 1, 42);
        assert!(bounty.dev == dev && bounty.streamer == streamer, 43);

        bounty.state = 2;
        let reward_coin = coin::split(coin_vault, bounty.reward);
        transfer::public_transfer(reward_coin, streamer);
        event::emit(BountyCompletedEvent {
            bounty_id: object::id(&bounty.id),
            dev,
            streamer
        });
    }
}
