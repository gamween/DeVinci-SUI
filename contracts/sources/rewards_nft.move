module creator_seal::rewards_nft {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;

    // ===== Structs =====

    /// Badge NFT de récompense
    public struct RewardBadge has key, store {
        id: UID,
        badge_type: vector<u8>,
        title: vector<u8>,
        description: vector<u8>,
        image_uri: vector<u8>,
        creator_profile_id: ID,
        owner: address,
        is_soulbound: bool,
        minted_at: u64,
    }

    // ===== Events =====

    public struct BadgeMinted has copy, drop {
        badge_id: ID,
        owner: address,
        badge_type: vector<u8>,
    }

    // ===== Public Functions =====

    /// Mint un badge de récompense
    public entry fun mint_reward_badge(
        creator_profile_id: ID,
        badge_type: vector<u8>,
        title: vector<u8>,
        description: vector<u8>,
        image_uri: vector<u8>,
        recipient: address,
        is_soulbound: bool,
        ctx: &mut TxContext
    ) {
        let badge_uid = object::new(ctx);
        let badge_id = object::uid_to_inner(&badge_uid);

        let badge = RewardBadge {
            id: badge_uid,
            badge_type,
            title,
            description,
            image_uri,
            creator_profile_id,
            owner: recipient,
            is_soulbound,
            minted_at: tx_context::epoch(ctx),
        };

        event::emit(BadgeMinted {
            badge_id,
            owner: recipient,
            badge_type,
        });

        transfer::transfer(badge, recipient);
    }
}
