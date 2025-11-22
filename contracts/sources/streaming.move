module creator_seal::streaming {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;

    // ===== Structs =====

    /// CreatorProfile: profil d'un créateur
    public struct CreatorProfile has key, store {
        id: UID,
        creator_address: address,
        name: vector<u8>,
        description: vector<u8>,
        metadata_uri: vector<u8>,
        is_active: bool,
    }

    /// CreatorCapability: capability pour gérer le profil créateur
    public struct CreatorCapability has key {
        id: UID,
        creator_profile_id: ID,
    }

    /// FanPass: NFT pour les fans
    public struct FanPass has key, store {
        id: UID,
        creator_profile_id: ID,
        owner: address,
        level: u64,
        xp: u64,
        metadata_uri: vector<u8>,
        is_soulbound: bool,
    }

    /// ExclusiveDrop: contenu exclusif chiffré
    public struct ExclusiveDrop has key, store {
        id: UID,
        creator_profile_id: ID,
        title: vector<u8>,
        content_type: vector<u8>,
        seal_content_id: vector<u8>,
        min_level_required: u64,
        timestamp: u64,
    }

    /// Badge: achievement NFT
    public struct Badge has key, store {
        id: UID,
        creator_profile_id: ID,
        owner: address,
        badge_type: vector<u8>,
        metadata_uri: vector<u8>,
        is_soulbound: bool,
    }

    // ===== Events =====

    public struct CreatorProfileCreated has copy, drop {
        profile_id: ID,
        creator: address,
    }

    public struct FanPassMinted has copy, drop {
        pass_id: ID,
        creator_profile_id: ID,
        owner: address,
    }

    public struct DropCreated has copy, drop {
        drop_id: ID,
        creator_profile_id: ID,
    }

    // ===== Public Functions =====

    /// Créer un profil créateur
    public entry fun create_creator_profile(
        name: vector<u8>,
        description: vector<u8>,
        metadata_uri: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let profile_uid = object::new(ctx);
        let profile_id = object::uid_to_inner(&profile_uid);

        let profile = CreatorProfile {
            id: profile_uid,
            creator_address: sender,
            name,
            description,
            metadata_uri,
            is_active: true,
        };

        let capability = CreatorCapability {
            id: object::new(ctx),
            creator_profile_id: profile_id,
        };

        event::emit(CreatorProfileCreated {
            profile_id,
            creator: sender,
        });

        transfer::transfer(capability, sender);
        transfer::share_object(profile);
    }

    /// Mint un FanPass
    public entry fun mint_fan_pass(
        creator_profile: &CreatorProfile,
        metadata_uri: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let pass_uid = object::new(ctx);
        let pass_id = object::uid_to_inner(&pass_uid);

        let fan_pass = FanPass {
            id: pass_uid,
            creator_profile_id: object::id(creator_profile),
            owner: sender,
            level: 1,
            xp: 0,
            metadata_uri,
            is_soulbound: true,
        };

        event::emit(FanPassMinted {
            pass_id,
            creator_profile_id: object::id(creator_profile),
            owner: sender,
        });

        transfer::transfer(fan_pass, sender);
    }

    /// Créer un drop exclusif (nécessite CreatorCapability)
    public entry fun create_exclusive_drop(
        _cap: &CreatorCapability,
        creator_profile: &CreatorProfile,
        title: vector<u8>,
        content_type: vector<u8>,
        seal_content_id: vector<u8>,
        min_level_required: u64,
        ctx: &mut TxContext
    ) {
        let drop_uid = object::new(ctx);
        let drop_id = object::uid_to_inner(&drop_uid);

        let drop = ExclusiveDrop {
            id: drop_uid,
            creator_profile_id: object::id(creator_profile),
            title,
            content_type,
            seal_content_id,
            min_level_required,
            timestamp: tx_context::epoch(ctx),
        };

        event::emit(DropCreated {
            drop_id,
            creator_profile_id: object::id(creator_profile),
        });

        transfer::share_object(drop);
    }
}
