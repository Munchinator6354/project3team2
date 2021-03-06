const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");


mongoose.connect(
    process.env.MONGODB_URI ||
    // "mongodb://GenericUser:GenericPassword123@ds029658.mlab.com:29658/heroku_4xwdbn2k"
    "mongodb://localhost/eQuiptDB"
  );

  var inventorySeed = [
{name: 'Apothecary Kit', description: 'Required to craft Apothecary items.', itemlevel: '1' , quantity: '0', link:'https://www.rauantiques.com/wp/wp-content/uploads/2019/12/naval-surgeon.png' },
{name: 'Artificer Kit', description: 'Required to craft Artificer items.', itemlevel: '1' , quantity: '0', link:'https://content.invisioncic.com/Mwarframe/pages_media/1_VEDQueensFinal.png' },
{name: 'Blacksmith Kit', description: 'Required to craft Blacksmith items.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/kingdom-come-deliverance/images/6/69/Kingdom_Come_-_Armour_kit.png/revision/latest/top-crop/width/360/height/360?cb=20180226192330' },
{name: 'Bowyer Kit', description: 'Required to craft Bowyer items.', itemlevel: '1' , quantity: '0', link:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/965452e2-ec2e-43ec-a2e2-430dd80531c5/dauix5r-1472b9b8-6033-4dbb-8bf6-5bd8d96344af.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk2NTQ1MmUyLWVjMmUtNDNlYy1hMmUyLTQzMGRkODA1MzFjNVwvZGF1aXg1ci0xNDcyYjliOC02MDMzLTRkYmItOGJmNi01YmQ4ZDk2MzQ0YWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.c6_I7CvnCA5ENwyYzHW8KePCpJPyDG7_GMwE0NxwbZg' },
{name: 'Gunsmith Kit', description: 'Required to craft Gunsmith items.', itemlevel: '1' , quantity: '0', link:'https://blog.hornguild.org/wp-content/uploads/2015/12/1-toone-lathe-2.png' },
{name: 'Chirurgeon Kit', description: 'Required to use certain skills, such as Mend.', itemlevel: '1' , quantity: '0', link:'https://i.pinimg.com/originals/86/c2/8b/86c28b9633a2024b3690936528164063.png' },
{name: 'Cloak', description: 'Aids in the spreading of rumors.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/clubpenguin/images/5/57/Greenhoodedcloak.PNG/revision/latest/scale-to-width-down/340?cb=20140217164343' },
{name: 'Fine Clothing', description: 'Aids in the acquisition of rumors.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/1/15/Radiant_Raiment_Fine_Clothes.png/revision/latest/top-crop/width/360/height/450?cb=20120206001325' },
{name: "Duelist's Gloves", description: 'Improves ones ability to maintain grip on a weapon.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/play-rust/images/f/f9/Duelist_Gloves_icon.png/revision/latest?cb=20161207182201' },
{name: 'Stalwart Boots', description: 'Improves ones ability to maintain stance after a heavy blow.', itemlevel: '1' , quantity: '0', link:'https://www.freepngimg.com/thumb/boots/34-combat-boots-png-image-thumb.png' },
{name: 'Low Quality Lock', description: 'A lock for a door or chest.', itemlevel: '1' , quantity: '0', link:'https://cubits.org/PlaypenGraphics/files/get/2013-01-07/Zanymuse/8519c0.png' },
{name: 'Craftsmanship Tools', description: 'Increases the efficiency of crafting.', itemlevel: '1' , quantity: '0', link:'https://webstockreview.net/images/clipart-ball-tool-15.png' },
{name: 'Basic Trap', description: 'A low quality trap.', itemlevel: '1' , quantity: '0', link:'https://gamepedia.cursecdn.com/ylands_gamepedia/thumb/9/92/Bear_Trap.png/250px-Bear_Trap.png?version=de4ad794e2f9a5785468524ca953bdb1' },
{name: 'Lockpicking Kit', description: 'Required to open locks without the corresponding key.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/bioshock/images/f/f7/BSI_Lockpicking_Kit_Model_Render.png/revision/latest/scale-to-width-down/340?cb=20160123135506' },
{name: 'Iron Shield', description: 'An iron shield.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/d/d4/IronshieldMorrowind.png/revision/latest?cb=20160709151245' },
{name: 'Leather Armor', description: 'A set of leather armor.', itemlevel: '0' , quantity: '0', link:'https://images.squarespace-cdn.com/content/v1/59aa8bee197aea4ad67f52ae/1504388096180-GXQ5CU6U9P3MZLJMY9SZ/ke17ZwdGBToddI8pDm48kMFHsobaOCQT6BUfPDhHErlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEJg4aYXu8LbvyDOr2csRPU2eKenc2gw9phkBneUz-a1jqWIIaSPh2v08GbKqpiV54/Western-Armor_0011_padded.png?format=1000w' },
{name: 'Iron Chain Shirt', description: 'An iron chain shirt.', itemlevel: '0' , quantity: '0', link:'https://mcishop.azureedge.net/mciassets/w_9_0043177_john-riveted-steel-chainmail-hauberk_550.png' },
{name: 'Iron Coat of Plates', description: 'An iron coat of plates.', itemlevel: '0' , quantity: '0', link:'https://gamepedia.cursecdn.com/pathofexile_gamepedia/2/21/Gladiator_Plate_inventory_icon.png?version=d48aeba7b75b0aad31a1087aaff208d4' },
{name: 'Iron Small Weapon', description: 'An iron small weapon, or throwing weapon.', itemlevel: '0' , quantity: '0', link:'https://lh3.googleusercontent.com/proxy/xHgU2G5w6vuisIX77vRerLvTVTUSw5anHodPR8uByk5rDyldbdRCFy0pyLeO44yO2aenY2SWmrQra-nJXJpsFKBq985u29a_VA' },
{name: 'Iron Medium Weapon', description: 'An iron weapon that can be held in one hand, but is larger than a small weapon.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/tradelands/images/c/ca/Short_Sword.png/revision/latest/top-crop/width/360/height/450?cb=20150607170729' },
{name: 'Iron Large Weapon', description: 'An iron weapon to be wielded with two hands.', itemlevel: '0' , quantity: '0', link:'https://i.pinimg.com/originals/f8/ff/b2/f8ffb2f59e05c78629c23463c78a2326.png' },
{name: 'Hardened Iron Shield', description: 'A hardened iron shield.', itemlevel: '1' , quantity: '0', link:'https://atlas.wiki.fextralife.com/file/Atlas/heavy_shield_armor_atlas_mmo_wiki_guide.png' },
{name: 'Hardened Leather Armor', description: 'A suit of hardened leather armor.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/emerald-isles/images/c/c3/Simple-Studded-Leather-Armour.png/revision/latest?cb=20180506015511' },
{name: 'Hardened Iron Chain Shirt', description: 'A hardened iron chain shirt.', itemlevel: '1' , quantity: '0', link:'https://gamepedia.cursecdn.com/pathofexile_gamepedia/6/6d/Full_Chainmail_inventory_icon.png' },
{name: 'Hardened Iron Coat of Plates', description: 'A hardened iron coat of plates.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/infinityblade/images/6/60/Steel_Plate_Armor.png/revision/latest/scale-to-width-down/340?cb=20131120211955' },
{name: 'Hardened Iron Platemail', description: 'A hardened iron platemail.', itemlevel: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/bouldersandbarbarians/images/c/c2/Platemail.png/revision/latest/top-crop/width/360/height/450?cb=20181120154004' },
{name: 'Hardened Iron Small Weapon', description: 'A hardened iron small weapon, or throwing weapon.', itemlevel: '1' , quantity: '0', link:'https://pngriver.com/wp-content/uploads/2018/03/Download-Knife-PNG-Photo-For-Designing-Purpose.png' },
{name: 'Hardened Iron Medium Weapon', description: 'A hardened iron weapon that can be held in one hand but is larger than a small weapon.', itemlevel: '1' , quantity: '0', link:'https://db4sgowjqfwig.cloudfront.net/images/4072565/Shortsword__2.png' },
{name: 'Hardened Iron Large Weapons', description: 'A hardened iron weapon to be wielded with two hands.', itemlevel: '1' , quantity: '0', link:'https://img1.wikia.nocookie.net/__cb20110819054848/finalfantasy/images/archive/8/84/20110819064841!FFXI_Great_Sword_6A.png' },
{name: 'Patch Kit', description: 'A kit of rivets, metal plates, and various leather bits to temporarily restore the usefulness of damaged armor.', itemlevel: '1' , quantity: '0', link:'https://steel-mastery.com/image/catalog/PhotosForSharingLinks/plate-armour-maintenance-by-steel-mastery.jpg' },
{name: 'Arrows', description: 'A set of 10 arrows.', itemlevel: '1' , quantity: '0', link:'https://www.pngkey.com/png/full/102-1020183_bow-and-arrow-vector-bow-and-arrow.png' },
{name: 'Bullets', description: 'A set of 3 bullets.', itemlevel: '1' , quantity: '0', link:'https://gamepedia.cursecdn.com/arksurvivalevolved_gamepedia/8/88/Simple_Bullet.png' },
{name: 'Iron Ingot', description: 'A rough iron ingot.', itemlevel: '0' , quantity: '0', link:'https://gamepedia.cursecdn.com/atlas_gamepedia_en/0/0a/Iron_Ingot.png' },
{name: 'Cloth', description: 'A bolt of cloth.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/gardenpaws/images/5/51/Cloth.png/revision/latest/top-crop/width/360/height/450?cb=20180915170530' },
{name: 'Refined Wood', description: 'A bit of refined wood.', itemlevel: '0' , quantity: '0', link:'https://gamepedia.cursecdn.com/minecraft_gamepedia/c/c5/Oak_Planks_JE6_BE2.png' },
{name: 'Leather', description: 'A bit of leather.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/4/4b/TESV_Leather.png/revision/latest/top-crop/width/360/height/450?cb=20120311135843' },
{name: 'Distilled Spirits', description: 'Distilled spirits which can be used as a base for many apothecarial substances.', itemlevel: '0' , quantity: '0', link:'https://pics.clipartpng.com/Liquor_Bottle_PNG_Clipart-87.png' },
{name: 'Bow', description: 'A basic longbow.', itemlevel: '0' , quantity: '0', link:'https://static.turbosquid.com/Preview/001200/307/SC/3D-medieval-bow-model_Z.jpg' },
{name: 'Pistol', description: 'A basic pistol.', itemlevel: '0' , quantity: '0', link:'https://www.medievalcollectibles.com/wp-content/uploads/2019/04/ME-0170.png' },
{name: 'Werewolf Tallow', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/witcher/images/f/fa/Bestiary_Wolf.png/revision/latest/top-crop/width/360/height/450?cb=20071116211923' },
{name: "Dragon's Eye", description: 'A common apothecary reagent acquired from a plant.', itemlevel: '0' , quantity: '0', link:'https://i.ya-webdesign.com/images/dragon-eye-png-3.png' },
{name: 'Mandrake', description: 'A common apothecary reagent acquired from a plant.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/bloodbrothersgame/images/c/c3/Mandrake.png/revision/latest/top-crop/width/360/height/450?cb=20121106225737' },
{name: 'Ghoul Venom', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0' , quantity: '0', link:'https://cdn.clipart.email/26dd8c59b3bd5d5554cf15baffc03c12_poison-clipart-panda-free-clipart-images_999-2331.png' },
{name: 'Grave Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/slay-the-spire/images/4/4e/BloodVial.png/revision/latest?cb=20200203150024' },
{name: 'Vampire Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0' , quantity: '0', link:'https://vignette.wikia.nocookie.net/darkmetal/images/a/a4/Blood-Vial.png/revision/latest/scale-to-width-down/340?cb=20150716160903' },
{name: "Widow's Petal", description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0' , quantity: '0', link:'https://www.transparentpng.com/thumb/flower/dahlia-flower-png-orange-transparent-image-0.png' },
{name: 'Thornwood Fern', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0' , quantity: '0', link:'https://i.ya-webdesign.com/images/fern-png-8.png' },
{name: 'Tarkathi Poppy', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0' , quantity: '0', link:'https://purepng.com/public/uploads/large/purepng.com-poppy-flowerflower-poppy-poppies-961524680906srkrd.png' },
{name: 'Crypt Moss', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0' , quantity: '0', link:'https://oldschool.runescape.wiki/images/8/83/Grimy_ranarr_weed_detail.png?ba61f' },
   ]

  var AdminInventorySeed = [
  {name: 'Apothecary Kit', description: 'Required to craft Apothecary items.', itemlevel: '1', link:'https://www.rauantiques.com/wp/wp-content/uploads/2019/12/naval-surgeon.png' },
{name: 'Artificer Kit', description: 'Required to craft Artificer items.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/findle/images/6/6b/ArtificerPIC.PNG/revision/latest?cb=20190301024642' },
{name: 'Blacksmith Kit', description: 'Required to craft Blacksmith items.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/kingdom-come-deliverance/images/6/69/Kingdom_Come_-_Armour_kit.png/revision/latest/top-crop/width/360/height/360?cb=20180226192330' },
{name: 'Bowyer Kit', description: 'Required to craft Bowyer items.', itemlevel: '1', link:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/965452e2-ec2e-43ec-a2e2-430dd80531c5/dauix5r-1472b9b8-6033-4dbb-8bf6-5bd8d96344af.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk2NTQ1MmUyLWVjMmUtNDNlYy1hMmUyLTQzMGRkODA1MzFjNVwvZGF1aXg1ci0xNDcyYjliOC02MDMzLTRkYmItOGJmNi01YmQ4ZDk2MzQ0YWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.c6_I7CvnCA5ENwyYzHW8KePCpJPyDG7_GMwE0NxwbZg' },
{name: 'Gunsmith Kit', description: 'Required to craft Gunsmith items.', itemlevel: '1', link:'https://blog.hornguild.org/wp-content/uploads/2015/12/1-toone-lathe-2.png' },
{name: 'Chirurgeon Kit', description: 'Required to use certain skills, such as Mend.', itemlevel: '1', link:'https://i.pinimg.com/originals/86/c2/8b/86c28b9633a2024b3690936528164063.png' },
{name: 'Cloak', description: 'Aids in the spreading of rumors.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/clubpenguin/images/5/57/Greenhoodedcloak.PNG/revision/latest/scale-to-width-down/340?cb=20140217164343' },
{name: 'Fine Clothing', description: 'Aids in the acquisition of rumors.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/1/15/Radiant_Raiment_Fine_Clothes.png/revision/latest/top-crop/width/360/height/450?cb=20120206001325' },
{name: "Duelist's Gloves", description: 'Improves ones ability to maintain grip on a weapon.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/play-rust/images/f/f9/Duelist_Gloves_icon.png/revision/latest?cb=20161207182201' },
{name: 'Stalwart Boots', description: 'Improves ones ability to maintain stance after a heavy blow.', itemlevel: '1', link:'https://www.freepngimg.com/thumb/boots/34-combat-boots-png-image-thumb.png' },
{name: 'Low Quality Lock', description: 'A lock for a door or chest.', itemlevel: '1', link:'https://cubits.org/PlaypenGraphics/files/get/2013-01-07/Zanymuse/8519c0.png' },
{name: 'Craftsmanship Tools', description: 'Increases the efficiency of crafting.', itemlevel: '1', link:'https://webstockreview.net/images/clipart-ball-tool-15.png' },
{name: 'Basic Trap', description: 'A low quality trap.', itemlevel: '1', link:'https://gamepedia.cursecdn.com/ylands_gamepedia/thumb/9/92/Bear_Trap.png/250px-Bear_Trap.png?version=de4ad794e2f9a5785468524ca953bdb1' },
{name: 'Lockpicking Kit', description: 'Required to open locks without the corresponding key.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/bioshock/images/f/f7/BSI_Lockpicking_Kit_Model_Render.png/revision/latest/scale-to-width-down/340?cb=20160123135506' },
{name: 'Iron Shield', description: 'An iron shield.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/d/d4/IronshieldMorrowind.png/revision/latest?cb=20160709151245' },
{name: 'Leather Armor', description: 'A set of leather armor.', itemlevel: '0', link:'https://images.squarespace-cdn.com/content/v1/59aa8bee197aea4ad67f52ae/1504388096180-GXQ5CU6U9P3MZLJMY9SZ/ke17ZwdGBToddI8pDm48kMFHsobaOCQT6BUfPDhHErlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEJg4aYXu8LbvyDOr2csRPU2eKenc2gw9phkBneUz-a1jqWIIaSPh2v08GbKqpiV54/Western-Armor_0011_padded.png?format=1000w' },
{name: 'Iron Chain Shirt', description: 'An iron chain shirt.', itemlevel: '0', link:'https://mcishop.azureedge.net/mciassets/w_9_0043177_john-riveted-steel-chainmail-hauberk_550.png' },
{name: 'Iron Coat of Plates', description: 'An iron coat of plates.', itemlevel: '0', link:'https://gamepedia.cursecdn.com/pathofexile_gamepedia/2/21/Gladiator_Plate_inventory_icon.png?version=d48aeba7b75b0aad31a1087aaff208d4' },
{name: 'Iron Small Weapon', description: 'An iron small weapon, or throwing weapon.', itemlevel: '0', link:'https://lh3.googleusercontent.com/proxy/xHgU2G5w6vuisIX77vRerLvTVTUSw5anHodPR8uByk5rDyldbdRCFy0pyLeO44yO2aenY2SWmrQra-nJXJpsFKBq985u29a_VA' },
{name: 'Iron Medium Weapon', description: 'An iron weapon that can be held in one hand, but is larger than a small weapon.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/tradelands/images/c/ca/Short_Sword.png/revision/latest/top-crop/width/360/height/450?cb=20150607170729' },
{name: 'Iron Large Weapon', description: 'An iron weapon to be wielded with two hands.', itemlevel: '0', link:'https://i.pinimg.com/originals/f8/ff/b2/f8ffb2f59e05c78629c23463c78a2326.png' },
{name: 'Hardened Iron Shield', description: 'A hardened iron shield.', itemlevel: '1', link:'https://atlas.wiki.fextralife.com/file/Atlas/heavy_shield_armor_atlas_mmo_wiki_guide.png' },
{name: 'Hardened Leather Armor', description: 'A suit of hardened leather armor.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/emerald-isles/images/c/c3/Simple-Studded-Leather-Armour.png/revision/latest?cb=20180506015511' },
{name: 'Hardened Iron Chain Shirt', description: 'A hardened iron chain shirt.', itemlevel: '1', link:'https://gamepedia.cursecdn.com/pathofexile_gamepedia/6/6d/Full_Chainmail_inventory_icon.png' },
{name: 'Hardened Iron Coat of Plates', description: 'A hardened iron coat of plates.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/infinityblade/images/6/60/Steel_Plate_Armor.png/revision/latest/scale-to-width-down/340?cb=20131120211955' },
{name: 'Hardened Iron Platemail', description: 'A hardened iron platemail.', itemlevel: '1', link:'https://vignette.wikia.nocookie.net/bouldersandbarbarians/images/c/c2/Platemail.png/revision/latest/top-crop/width/360/height/450?cb=20181120154004' },
{name: 'Hardened Iron Small Weapon', description: 'A hardened iron small weapon, or throwing weapon.', itemlevel: '1', link:'https://pngriver.com/wp-content/uploads/2018/03/Download-Knife-PNG-Photo-For-Designing-Purpose.png' },
{name: 'Hardened Iron Medium Weapon', description: 'A hardened iron weapon that can be held in one hand but is larger than a small weapon.', itemlevel: '1', link:'https://db4sgowjqfwig.cloudfront.net/images/4072565/Shortsword__2.png' },
{name: 'Hardened Iron Large Weapons', description: 'A hardened iron weapon to be wielded with two hands.', itemlevel: '1', link:'https://img1.wikia.nocookie.net/__cb20110819054848/finalfantasy/images/archive/8/84/20110819064841!FFXI_Great_Sword_6A.png' },
{name: 'Patch Kit', description: 'A kit of rivets, metal plates, and various leather bits to temporarily restore the usefulness of damaged armor.', itemlevel: '1', link:'https://steel-mastery.com/image/catalog/PhotosForSharingLinks/plate-armour-maintenance-by-steel-mastery.jpg' },
{name: 'Arrows', description: 'A set of 10 arrows.', itemlevel: '1', link:'https://www.pngkey.com/png/full/102-1020183_bow-and-arrow-vector-bow-and-arrow.png' },
{name: 'Bullets', description: 'A set of 3 bullets.', itemlevel: '1', link:'https://gamepedia.cursecdn.com/arksurvivalevolved_gamepedia/8/88/Simple_Bullet.png' },
{name: 'Iron Ingot', description: 'A rough iron ingot.', itemlevel: '0', link:'https://gamepedia.cursecdn.com/atlas_gamepedia_en/0/0a/Iron_Ingot.png' },
{name: 'Cloth', description: 'A bolt of cloth.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/gardenpaws/images/5/51/Cloth.png/revision/latest/top-crop/width/360/height/450?cb=20180915170530' },
{name: 'Refined Wood', description: 'A bit of refined wood.', itemlevel: '0', link:'https://gamepedia.cursecdn.com/minecraft_gamepedia/c/c5/Oak_Planks_JE6_BE2.png' },
{name: 'Leather', description: 'A bit of leather.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/4/4b/TESV_Leather.png/revision/latest/top-crop/width/360/height/450?cb=20120311135843' },
{name: 'Distilled Spirits', description: 'Distilled spirits which can be used as a base for many apothecarial substances.', itemlevel: '0', link:'https://pics.clipartpng.com/Liquor_Bottle_PNG_Clipart-87.png' },
{name: 'Bow', description: 'A basic longbow.', itemlevel: '0', link:'https://static.turbosquid.com/Preview/001200/307/SC/3D-medieval-bow-model_Z.jpg' },
{name: 'Pistol', description: 'A basic pistol.', itemlevel: '0', link:'https://www.medievalcollectibles.com/wp-content/uploads/2019/04/ME-0170.png' },
{name: 'Werewolf Tallow', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/witcher/images/f/fa/Bestiary_Wolf.png/revision/latest/top-crop/width/360/height/450?cb=20071116211923' },
{name: "Dragon's Eye", description: 'A common apothecary reagent acquired from a plant.', itemlevel: '0', link:'https://i.ya-webdesign.com/images/dragon-eye-png-3.png' },
{name: 'Mandrake', description: 'A common apothecary reagent acquired from a plant.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/bloodbrothersgame/images/c/c3/Mandrake.png/revision/latest/top-crop/width/360/height/450?cb=20121106225737' },
{name: 'Ghoul Venom', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0', link:'https://cdn.clipart.email/26dd8c59b3bd5d5554cf15baffc03c12_poison-clipart-panda-free-clipart-images_999-2331.png' },
{name: 'Grave Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/slay-the-spire/images/4/4e/BloodVial.png/revision/latest?cb=20200203150024' },
{name: 'Vampire Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: '0', link:'https://vignette.wikia.nocookie.net/darkmetal/images/a/a4/Blood-Vial.png/revision/latest/scale-to-width-down/340?cb=20150716160903' },
{name: "Widow's Petal", description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0', link:'https://www.transparentpng.com/thumb/flower/dahlia-flower-png-orange-transparent-image-0.png' },
{name: 'Thornwood Fern', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0', link:'https://i.ya-webdesign.com/images/fern-png-8.png' },
{name: 'Tarkathi Poppy', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0', link:'https://purepng.com/public/uploads/large/purepng.com-poppy-flowerflower-poppy-poppies-961524680906srkrd.png' },
{name: 'Crypt Moss', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: '0', link:'https://oldschool.runescape.wiki/images/8/83/Grimy_ranarr_weed_detail.png?ba61f' }
  ]
var userSeed = [
  {playername: "Bob", username: "Bob", password: "12345", charactername: "Bobert", email:"Bob@gmail.com", role:"Admin" },
  {playername: "Noelle", username: "noelley", password: "12344", charactername: "Noelle the Drained Druid", email:"Noelle@gmail.com", role:"Staff" },
  {playername: "Ryan", username: "ryanguy", password: "12346", charactername: "Ryan the Narcoleptic Noble", email:"Ryan@gmail.com", role:"Player" },
  {playername: "Abe", username: "Abedude", password: "12347", charactername: "Abe the Weary Wizard", email:"Abe@gmail.com", role:"Player" },
  {playername: "Jessica", username: "Jessicagirl", password: "12348", charactername: "Jessica the Comical Cleric", email:"Jessica@gmail.com", role:"Player" }
]

var hashedUserSeed = []
function hashSeed(seed){
  for(i=0;i<seed.length;i++){
    hashedUserSeed.push({
      playername: seed[i].playername,
      username: seed[i].username,
      password: bcrypt.hashSync(seed[i].password, 10),
      charactername: seed[i].charactername,
      email: seed[i].email,
      role: seed[i].role,
      inventory: []
    })
  }
}

hashSeed(userSeed)

db.Inventory
.remove({})
.then(() => db.Inventory.collection.insertMany(inventorySeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  
})
.catch(err => {
  console.error(err);
  process.exit(1);
});

db.AdminInventory
.remove({})
.then(() => db.AdminInventory.collection.insertMany(AdminInventorySeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
})
.catch(err => {
  console.error(err);
  process.exit(1);
});

db.User
.remove({})
.then(() => db.User.collection.insertMany(hashedUserSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  db.Inventory
  .find({})
  .then(function(dbModel){
     db.User
     .findOneAndUpdate({playername: "Bob"}, {$push: {inventory: dbModel}}, {new:true})
     .populate("inventory")
     .then(function(dbUser){
       console.log(dbUser);
       process.exit(0);
     })
    })
     .catch(function(err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });  
      })
.catch(err => {
  console.error(err);
  process.exit(1);
});







// db.Inventory
// .findOne({name: 'Apothecary Kit'})
// .then(function(dbModel){
//    db.User
//    .findOneAndUpdate({playername: "Jessica"}, {$push: {inventory: dbModel._id}}, {new:true})
//    .then(function(dbUser){
//      console.log("HELLO");
//    })
    
//    })
// .then(data => {
//    console.log("Added Apothecary Kit to Jessica");
//   process.exit(0);
// })
// .catch(err => {
//   process.exit(1);
// }):