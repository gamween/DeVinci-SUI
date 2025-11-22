module creator_seal::donations {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::transfer;
    use sui::event;

    // ===== Structs =====

    /// Donation record
    public struct Donation has key, store {
        id: UID,
        from: address,
        to: address,
        amount: u64,
        message: vector<u8>,
        timestamp: u64,
    }

    // ===== Events =====

    public struct DonationSent has copy, drop {
        donation_id: ID,
        from: address,
        to: address,
        amount: u64,
    }

    // ===== Public Functions =====

    /// Envoyer une donation à un créateur
    public entry fun send_donation(
        creator_address: address,
        payment: Coin<SUI>,
        message: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let amount = coin::value(&payment);
        
        let donation_uid = object::new(ctx);
        let donation_id = object::uid_to_inner(&donation_uid);

        let donation = Donation {
            id: donation_uid,
            from: sender,
            to: creator_address,
            amount,
            message,
            timestamp: tx_context::epoch(ctx),
        };

        event::emit(DonationSent {
            donation_id,
            from: sender,
            to: creator_address,
            amount,
        });

        // Transférer les fonds au créateur
        transfer::public_transfer(payment, creator_address);
        
        // Partager le record de donation
        transfer::share_object(donation);
    }
}
