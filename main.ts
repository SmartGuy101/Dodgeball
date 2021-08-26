namespace SpriteKind {
    export const Shield = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Speed = SpriteKind.create()
    export const Slow = SpriteKind.create()
    export const TimeSlow = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Slow, function (sprite, otherSprite) {
    Slow = true
    SlowSprite.destroy(effects.disintegrate, 100)
    pause(10000)
    Slow = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shield, function (sprite, otherSprite) {
    Shield = true
    ShieldSprite.destroy(effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TimeSlow, function (sprite, otherSprite) {
    TimeSlow = true
    TimeSlowSprite.destroy(effects.disintegrate, 100)
    pause(5000)
    TimeSlow = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Shield == !(true)) {
    	
    } else {
        otherSprite.destroy(effects.disintegrate, 100)
        timer.after(110, function () {
            Shield = false
        })
    }
})
let MyEnemy: Sprite = null
let Enemies: Sprite[] = []
let TimeSlowSprite: Sprite = null
let ShieldSprite: Sprite = null
let SlowSprite: Sprite = null
let TimeSlow = false
let Slow = false
let Shield = false
let MyPlayer = sprites.create(assets.image`Player`, SpriteKind.Player)
let Enemy_speed = 5
Shield = false
Slow = false
TimeSlow = false
scene.setBackgroundColor(15)
controller.moveSprite(MyPlayer)
MyPlayer.setBounceOnWall(true)
info.setScore(0)
forever(function () {
    Enemies = sprites.allOfKind(SpriteKind.Enemy)
})
forever(function () {
    if (Slow == false) {
        pause(randint(6000, 12000))
        SlowSprite = sprites.create(assets.image`Slow Sprite`, SpriteKind.Slow)
        SlowSprite.startEffect(effects.ashes)
        SlowSprite.setPosition(randint(0, 160), randint(0, 120))
        timer.after(10000, function () {
            SlowSprite.destroy(effects.disintegrate, 100)
        })
        pause(randint(6000, 12000))
    }
})
forever(function () {
    if (TimeSlow == true) {
        for (let value of Enemies) {
            Enemy_speed = 1
            value.vx += 10
            value.vy += 10
        }
    }
})
forever(function () {
    if (Slow == true) {
        controller.moveSprite(MyPlayer, 50, 50)
        MyPlayer.startEffect(effects.coolRadial, 50)
    } else {
        controller.moveSprite(MyPlayer, 100, 100)
        effects.clearParticles(MyPlayer)
    }
})
forever(function () {
    if (Shield == false) {
        pause(randint(5000, 10000))
        ShieldSprite = sprites.create(assets.image`Shield`, SpriteKind.Shield)
        ShieldSprite.startEffect(effects.ashes)
        ShieldSprite.setPosition(randint(0, 160), randint(0, 120))
        timer.after(10000, function () {
            SlowSprite.destroy(effects.disintegrate, 100)
        })
        pause(randint(5000, 10000))
    }
})
forever(function () {
    if (TimeSlow == false) {
        TimeSlowSprite = sprites.create(assets.image`TimeSlow`, SpriteKind.TimeSlow)
        TimeSlowSprite.startEffect(effects.ashes)
        TimeSlowSprite.setPosition(randint(0, 160), randint(0, 120))
        timer.after(10000, function () {
            TimeSlowSprite.destroy(effects.disintegrate, 100)
        })
        pause(randint(7000, 14000))
    }
})
forever(function () {
    if (Shield == true) {
        MyPlayer.setImage(assets.image`Player-Shield`)
    } else {
        MyPlayer.setImage(assets.image`Player`)
    }
})
forever(function () {
    MyPlayer.say(Enemy_speed)
})
forever(function () {
    MyEnemy = sprites.create(assets.image`Water-Ball`, SpriteKind.Enemy)
    MyEnemy.startEffect(effects.ashes)
    MyEnemy.setPosition(randint(0, 160), randint(0, 120))
    MyEnemy.setVelocity(Enemy_speed * 10, Enemy_speed * 10)
    MyEnemy.setBounceOnWall(true)
    info.changeScoreBy(1)
    pause(randint(2000, 5000))
})
