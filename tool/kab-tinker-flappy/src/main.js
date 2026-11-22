
import kaboom from "kaboom"

kaboom()

loadSprite("bean", "/sprites/bean.png")
loadSound("score", "/examples/sounds/score.mp3")
loadSound("wooosh", "/examples/sounds/wooosh.mp3")
loadSound("hit", "/examples/sounds/hit.mp3")

setGravity(3200)

scene("game", () => {

    const PIPE_OPEN = 240
    const PIPE_MIN = 60
    const JUMP_FORCE = 800
    const SPEED = 320
    const CEILING = -60

    let score = 0

    const bean = add([
        sprite("bean"),
        pos(width() / 4, 0),
        area(),
        body(),
    ])

    bean.onUpdate(() => {
        if (bean.pos.y >= height() || bean.pos.y <= CEILING) {
            go("lose", score)
        }
    })
})
go("game")