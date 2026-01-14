import { useEffect, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";

// Import assets
import ogTheme1 from "../../../assets/game/img/og-theme.png";
import ogTheme2 from "../../../assets/game/img/og-theme-2.png";
import sfxPoint from "../../../assets/game/audio/sfx_point.wav";
import sfxWing from "../../../assets/game/audio/sfx_wing.wav";
import sfxHit from "../../../assets/game/audio/sfx_hit.wav";
import sfxDie from "../../../assets/game/audio/sfx_die.wav";
import sfxSwoosh from "../../../assets/game/audio/sfx_swooshing.wav";

interface FlappyBirdGameProps {
  isActive: boolean;
}

const FlappyBirdGame: React.FC<FlappyBirdGameProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{
    animationId: number | null;
    intervalId: ReturnType<typeof setInterval> | null;
    cleanup: () => void;
  } | null>(null);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load images
    const theme1 = new Image();
    theme1.src = ogTheme1;
    const theme2 = new Image();
    theme2.src = ogTheme2;

    // Load sounds
    const SFX_SCORE = new Audio(sfxPoint);
    const SFX_FLAP = new Audio(sfxWing);
    const SFX_COLLISION = new Audio(sfxHit);
    const SFX_FALL = new Audio(sfxDie);
    const SFX_SWOOSH = new Audio(sfxSwoosh);

    let frame = 0;
    const degree = Math.PI / 180;

    const gameState = {
      current: 0,
      getReady: 0,
      play: 1,
      gameOver: 2,
    };

    // Background
    const bg = {
      imgX: 0,
      imgY: 0,
      width: 276,
      height: 228,
      x: 0,
      y: canvas.height - 228,
      w: 276,
      h: 228,
      dx: 0.2,
      render: function () {
        ctx.drawImage(
          theme1,
          this.imgX,
          this.imgY,
          this.width,
          this.height,
          this.x,
          this.y,
          this.w,
          this.h
        );
        ctx.drawImage(
          theme1,
          this.imgX,
          this.imgY,
          this.width,
          this.height,
          this.x + this.width,
          this.y,
          this.w,
          this.h
        );
        ctx.drawImage(
          theme1,
          this.imgX,
          this.imgY,
          this.width,
          this.height,
          this.x + this.width * 2,
          this.y,
          this.w,
          this.h
        );
      },
      position: function () {
        if (gameState.current === gameState.getReady) {
          this.x = 0;
        }
        if (gameState.current === gameState.play) {
          this.x = (this.x - this.dx) % this.w;
        }
      },
    };

    // Pipes
    const pipes = {
      top: { imgX: 56, imgY: 323 },
      bot: { imgX: 84, imgY: 323 },
      width: 26,
      height: 160,
      w: 55,
      h: 300,
      gap: 85,
      dx: 2,
      minY: -260,
      maxY: -40,
      pipeGenerator: [] as { x: number; y: number }[],
      reset: function () {
        this.pipeGenerator = [];
      },
      render: function () {
        for (let i = 0; i < this.pipeGenerator.length; i++) {
          const pipe = this.pipeGenerator[i];
          const topPipe = pipe.y;
          const bottomPipe = pipe.y + this.gap + this.h;
          ctx.drawImage(
            theme2,
            this.top.imgX,
            this.top.imgY,
            this.width,
            this.height,
            pipe.x,
            topPipe,
            this.w,
            this.h
          );
          ctx.drawImage(
            theme2,
            this.bot.imgX,
            this.bot.imgY,
            this.width,
            this.height,
            pipe.x,
            bottomPipe,
            this.w,
            this.h
          );
        }
      },
      position: function () {
        if (gameState.current !== gameState.play) return;

        if (frame % 100 === 0) {
          this.pipeGenerator.push({
            x: canvas.width,
            y: Math.floor(
              Math.random() * (this.maxY - this.minY + 1) + this.minY
            ),
          });
        }

        for (let i = 0; i < this.pipeGenerator.length; i++) {
          const pg = this.pipeGenerator[i];
          const b = {
            left: bird.x - bird.r,
            right: bird.x + bird.r,
            top: bird.y - bird.r,
            bottom: bird.y + bird.r,
          };
          const p = {
            top: { top: pg.y, bottom: pg.y + this.h },
            bot: {
              top: pg.y + this.h + this.gap,
              bottom: pg.y + this.h * 2 + this.gap,
            },
            left: pg.x,
            right: pg.x + this.w,
          };

          pg.x -= this.dx;

          if (pg.x < -this.w) {
            this.pipeGenerator.shift();
            score.current++;
            SFX_SCORE.play();
          }

          // Collision detection
          if (
            b.left < p.right &&
            b.right > p.left &&
            b.top < p.top.bottom &&
            b.bottom > p.top.top
          ) {
            gameState.current = gameState.gameOver;
            SFX_COLLISION.play();
          }
          if (
            b.left < p.right &&
            b.right > p.left &&
            b.top < p.bot.bottom &&
            b.bottom > p.bot.top
          ) {
            gameState.current = gameState.gameOver;
            SFX_COLLISION.play();
          }
        }
      },
    };

    // Ground
    const ground = {
      imgX: 276,
      imgY: 0,
      width: 224,
      height: 112,
      x: 0,
      y: canvas.height - 112,
      w: 224,
      h: 112,
      dx: 2,
      render: function () {
        ctx.drawImage(
          theme1,
          this.imgX,
          this.imgY,
          this.width,
          this.height,
          this.x,
          this.y,
          this.w,
          this.h
        );
        ctx.drawImage(
          theme1,
          this.imgX,
          this.imgY,
          this.width,
          this.height,
          this.x + this.width,
          this.y,
          this.w,
          this.h
        );
      },
      position: function () {
        if (gameState.current === gameState.getReady) {
          this.x = 0;
        }
        if (gameState.current === gameState.play) {
          this.x = (this.x - this.dx) % (this.w / 2);
        }
      },
    };

    // Number map for score
    const map = [
      { imgX: 496, imgY: 60, width: 12, height: 18 },
      { imgX: 135, imgY: 455, width: 10, height: 18 },
      { imgX: 292, imgY: 160, width: 12, height: 18 },
      { imgX: 306, imgY: 160, width: 12, height: 18 },
      { imgX: 320, imgY: 160, width: 12, height: 18 },
      { imgX: 334, imgY: 160, width: 12, height: 18 },
      { imgX: 292, imgY: 184, width: 12, height: 18 },
      { imgX: 306, imgY: 184, width: 12, height: 18 },
      { imgX: 320, imgY: 184, width: 12, height: 18 },
      { imgX: 334, imgY: 184, width: 12, height: 18 },
    ];

    // Score
    const score = {
      current: 0,
      x: canvas.width / 2,
      y: 40,
      w: 15,
      h: 25,
      reset: function () {
        this.current = 0;
      },
      render: function () {
        if (
          gameState.current === gameState.play ||
          gameState.current === gameState.gameOver
        ) {
          const string = this.current.toString();
          const ones = parseInt(string.charAt(string.length - 1));
          const tens = parseInt(string.charAt(string.length - 2)) || 0;
          const hundreds = parseInt(string.charAt(string.length - 3)) || 0;

          if (this.current >= 1000) {
            gameState.current = gameState.gameOver;
          } else if (this.current >= 100) {
            ctx.drawImage(
              theme2,
              map[ones].imgX,
              map[ones].imgY,
              map[ones].width,
              map[ones].height,
              this.x - this.w / 2 + this.w + 3,
              this.y,
              this.w,
              this.h
            );
            ctx.drawImage(
              theme2,
              map[tens].imgX,
              map[tens].imgY,
              map[tens].width,
              map[tens].height,
              this.x - this.w / 2,
              this.y,
              this.w,
              this.h
            );
            ctx.drawImage(
              theme2,
              map[hundreds].imgX,
              map[hundreds].imgY,
              map[hundreds].width,
              map[hundreds].height,
              this.x - this.w / 2 - this.w - 3,
              this.y,
              this.w,
              this.h
            );
          } else if (this.current >= 10) {
            ctx.drawImage(
              theme2,
              map[ones].imgX,
              map[ones].imgY,
              map[ones].width,
              map[ones].height,
              this.x - this.w / 2 + this.w / 2 + 3,
              this.y,
              this.w,
              this.h
            );
            ctx.drawImage(
              theme2,
              map[tens].imgX,
              map[tens].imgY,
              map[tens].width,
              map[tens].height,
              this.x - this.w / 2 - this.w / 2 - 3,
              this.y,
              this.w,
              this.h
            );
          } else {
            ctx.drawImage(
              theme2,
              map[ones].imgX,
              map[ones].imgY,
              map[ones].width,
              map[ones].height,
              this.x - this.w / 2,
              this.y,
              this.w,
              this.h
            );
          }
        }
      },
    };

    // Bird
    const bird = {
      animation: [
        { imgX: 276, imgY: 114 },
        { imgX: 276, imgY: 140 },
        { imgX: 276, imgY: 166 },
        { imgX: 276, imgY: 140 },
      ],
      fr: 0,
      width: 34,
      height: 24,
      x: 50,
      y: 160,
      w: 34,
      h: 24,
      r: 12,
      fly: 5.25,
      gravity: 0.32,
      velocity: 0,
      rotation: 0,
      render: function () {
        const birdFrame = this.animation[this.fr];
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
          theme1,
          birdFrame.imgX,
          birdFrame.imgY,
          this.width,
          this.height,
          -this.w / 2,
          -this.h / 2,
          this.w,
          this.h
        );
        ctx.restore();
      },
      flap: function () {
        this.velocity = -this.fly;
      },
      position: function () {
        if (gameState.current === gameState.getReady) {
          this.y = 160;
          this.rotation = 0;
          if (frame % 20 === 0) this.fr++;
          if (this.fr > this.animation.length - 1) this.fr = 0;
        } else {
          if (frame % 4 === 0) this.fr++;
          if (this.fr > this.animation.length - 1) this.fr = 0;

          this.velocity += this.gravity;
          this.y += this.velocity;

          if (this.velocity <= this.fly) {
            this.rotation = -15 * degree;
          } else if (this.velocity >= this.fly + 2) {
            this.rotation = 70 * degree;
            this.fr = 1;
          } else {
            this.rotation = 0;
          }

          if (this.y + this.h / 2 >= canvas.height - ground.h) {
            this.y = canvas.height - ground.h - this.h / 2;
            this.fr = 2;
            this.rotation = 70 * degree;
            if (gameState.current === gameState.play) {
              gameState.current = gameState.gameOver;
              SFX_FALL.play();
            }
          }

          if (this.y - this.h / 2 <= 0) {
            this.y = this.r;
          }
        }
      },
    };

    // Get ready screen
    const getReady = {
      imgX: 0,
      imgY: 228,
      width: 174,
      height: 160,
      x: canvas.width / 2 - 174 / 2,
      y: canvas.height / 2 - 160,
      w: 174,
      h: 160,
      render: function () {
        if (gameState.current === gameState.getReady) {
          ctx.drawImage(
            theme1,
            this.imgX,
            this.imgY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.w,
            this.h
          );
        }
      },
    };

    // Medal sprites
    const medals = {
      bronze: { imgX: 112, imgY: 453, width: 22, height: 22 },
      silver: { imgX: 112, imgY: 477, width: 22, height: 22 },
      gold: { imgX: 121, imgY: 282, width: 22, height: 22 },
      platinum: { imgX: 121, imgY: 258, width: 22, height: 22 },
    };

    // Best score (stored in localStorage)
    const bestScore = {
      value: parseInt(localStorage.getItem("flappyBirdBest") || "0"),
      update: function (currentScore: number) {
        if (currentScore > this.value) {
          this.value = currentScore;
          localStorage.setItem("flappyBirdBest", this.value.toString());
        }
      },
    };

    // Game over screen
    const gameOverScreen = {
      imgX: 174,
      imgY: 228,
      width: 226,
      height: 158,
      x: canvas.width / 2 - 226 / 2,
      y: canvas.height / 2 - 160,
      w: 226,
      h: 160,
      render: function () {
        if (gameState.current === gameState.gameOver) {
          // Draw game over panel
          ctx.drawImage(
            theme1,
            this.imgX,
            this.imgY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.w,
            this.h
          );

          // Update best score
          bestScore.update(score.current);

          // Draw current score on panel (right side)
          const scoreX = this.x + 180;
          const scoreY = this.y + 78;
          drawNumber(score.current, scoreX, scoreY, 12, 18, "right");

          // Draw best score on panel (right side, below current)
          const bestX = this.x + 180;
          const bestY = this.y + 120;
          drawNumber(bestScore.value, bestX, bestY, 12, 18, "right");

          // Draw medal based on score
          const medalX = this.x + 32;
          const medalY = this.y + 88;
          const medalSize = 44;

          let medal = null;
          if (score.current >= 40) {
            medal = medals.platinum;
          } else if (score.current >= 30) {
            medal = medals.gold;
          } else if (score.current >= 20) {
            medal = medals.silver;
          } else if (score.current >= 10) {
            medal = medals.bronze;
          }

          if (medal) {
            ctx.drawImage(
              theme2,
              medal.imgX,
              medal.imgY,
              medal.width,
              medal.height,
              medalX,
              medalY,
              medalSize,
              medalSize
            );
          }
        }
      },
    };

    // Helper function to draw numbers
    const drawNumber = (
      num: number,
      x: number,
      y: number,
      w: number,
      h: number,
      align: "left" | "center" | "right" = "center"
    ) => {
      const string = num.toString();
      const digits = string.split("").map((d) => parseInt(d));
      const totalWidth = digits.length * w + (digits.length - 1) * 2;

      let startX = x;
      if (align === "center") {
        startX = x - totalWidth / 2;
      } else if (align === "right") {
        startX = x - totalWidth;
      }

      for (let i = 0; i < digits.length; i++) {
        const digit = digits[i];
        ctx.drawImage(
          theme2,
          map[digit].imgX,
          map[digit].imgY,
          map[digit].width,
          map[digit].height,
          startX + i * (w + 2),
          y,
          w,
          h
        );
      }
    };

    // Draw function
    const draw = () => {
      ctx.fillStyle = "#00bbc4";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      bg.render();
      pipes.render();
      ground.render();
      score.render();
      bird.render();
      getReady.render();
      gameOverScreen.render();
    };

    // Update function
    const update = () => {
      bird.position();
      bg.position();
      pipes.position();
      ground.position();
    };

    // Game loop
    const loop = () => {
      draw();
      update();
      frame++;
    };

    // Event handlers
    const handleClick = () => {
      if (gameState.current === gameState.getReady) {
        gameState.current = gameState.play;
      }
      if (gameState.current === gameState.play) {
        bird.flap();
        SFX_FLAP.play();
      }
      if (gameState.current === gameState.gameOver) {
        pipes.reset();
        score.reset();
        bird.y = 160;
        bird.velocity = 0;
        bird.rotation = 0;
        gameState.current = gameState.getReady;
        SFX_SWOOSH.play();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleClick();
      }
    };

    // Add event listeners
    canvas.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeydown);

    // Start game loop
    const intervalId = setInterval(loop, 17);

    // Store cleanup function
    gameRef.current = {
      animationId: null,
      intervalId,
      cleanup: () => {
        clearInterval(intervalId);
        canvas.removeEventListener("click", handleClick);
        window.removeEventListener("keydown", handleKeydown);
      },
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      // Wait for images to load before initializing
      const timer = setTimeout(() => {
        initGame();
      }, 100);
      return () => {
        clearTimeout(timer);
        if (gameRef.current) {
          gameRef.current.cleanup();
          gameRef.current = null;
        }
      };
    } else {
      if (gameRef.current) {
        gameRef.current.cleanup();
        gameRef.current = null;
      }
    }
  }, [isActive, initGame]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Carter One", cursive',
          color: "rgb(251, 176, 37)",
          textShadow: "2px 4px rgba(250,250,250, 1)",
          textAlign: "center",
        }}
      >
        FLAPPY BIRD
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <canvas
          ref={canvasRef}
          width={300}
          height={500}
          style={{
            display: "block",
            backgroundColor: "#00bbc4",
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
        }}
      >
        Press 'SPACE' or Click to play
      </Typography>
    </Box>
  );
};

export default FlappyBirdGame;
